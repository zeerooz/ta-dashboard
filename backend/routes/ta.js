const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'TAs';
const bucketName = 'ta-profile-pics';
const defaultProfilePic = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/default.jpg`;

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const { ID } = req.params;
            const fileName = `${ID}`;
            cb(null, fileName);
        },
    }),
});

// Add a new TA
router.post('/add', upload.single('ProfilePic'), async (req, res) => {
    const { Name, Email, RoomNum, Department, Courses, OfficeHours } = req.body;
    const ID = uuidv4(); // Generate a unique ID for the new TA
    const ProfilePic = req.file ? req.file.location : defaultProfilePic;

    try {
        const params = {
            TableName: tableName,
            Item: {
                ID, // Ensure ID is included
                Name,
                Email,
                ProfilePic,
                RoomNum,
                Department,
                Courses,
                OfficeHours,
            },
        };

        await dynamoDB.put(params).promise();
        res.status(201).json({ msg: 'TA added successfully', ID });
    } catch (err) {
        console.error('Error adding TA:', err.message);
        res.status(500).send('Server error');
    }
});

// Edit an existing TA
router.put('/edit/:ID', upload.single('ProfilePic'), async (req, res) => {
    const { ID } = req.params;
    const { Name, Email, RoomNum, Department, Courses, OfficeHours } = req.body;
    const ProfilePic = req.file ? req.file.location : undefined;

    try {
        const getParams = {
            TableName: tableName,
            Key: { ID }
        };
        const ta = await dynamoDB.get(getParams).promise();
        if (!ta.Item) {
            return res.status(404).json({ msg: 'TA not found' });
        }

        let updateExpression = 'set #name = :n, Email = :e, RoomNum = :r, Department = :d, Courses = :c, OfficeHours = :o';
        let expressionAttributeNames = { '#name': 'Name' };
        let expressionAttributeValues = {
            ':n': Name,
            ':e': Email,
            ':r': RoomNum,
            ':d': Department,
            ':c': Courses,
            ':o': OfficeHours,
        };

        if (ProfilePic) {
            updateExpression += ', ProfilePic = :p';
            expressionAttributeValues[':p'] = ProfilePic;
        }

        const updateParams = {
            TableName: tableName,
            Key: { ID },
            UpdateExpression: updateExpression,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: 'UPDATED_NEW',
        };

        const updatedTA = await dynamoDB.update(updateParams).promise();
        res.json({ msg: 'TA updated successfully', updatedTA });
    } catch (err) {
        console.error('Error updating TA:', err.message);
        res.status(500).send('Server error');
    }
});



// Fetch names and IDs of all TAs for the home page
router.get('/home-page', async (req, res) => {
    const params = {
        TableName: tableName,
        ProjectionExpression: '#id, #name', // Only select the ID and Name fields
        ExpressionAttributeNames: {
            '#id': 'ID',
            '#name': 'Name',
        },
    };

    try {
        const data = await dynamoDB.scan(params).promise();
        res.json(data.Items);
    } catch (err) {
        console.error('Error fetching TA names:', err.message);
        res.status(500).send('Server error');
    }
});

// Fetch a single TA by ID
router.get('/view/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        const params = {
            TableName: tableName,
            Key: { ID },
        };

        const ta = await dynamoDB.get(params).promise();
        if (!ta.Item) {
            return res.status(404).json({ msg: 'TA not found' });
        }

        res.json(ta.Item);
    } catch (err) {
        console.error('Error fetching TA:', err.message);
        res.status(500).send('Server error');
    }
});

// Delete a TA by ID
router.delete('/delete/:ID', async (req, res) => {
    const { ID } = req.params;

    try {
        const getParams = {
            TableName: tableName,
            Key: { ID },
        };
        const ta = await dynamoDB.get(getParams).promise();
        if (!ta.Item) {
            return res.status(404).json({ msg: 'TA not found' });
        }

        if (ta.Item.ProfilePic !== defaultProfilePic) {
            const deleteImageParams = {
                Bucket: bucketName,
                Key: ta.Item.ProfilePic.split('/').pop(),
            };
            await s3.deleteObject(deleteImageParams).promise();
        }

        const deleteParams = {
            TableName: tableName,
            Key: { ID },
        };
        await dynamoDB.delete(deleteParams).promise();

        res.json({ msg: 'TA deleted successfully' });
    } catch (err) {
        console.error('Error deleting TA:', err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
