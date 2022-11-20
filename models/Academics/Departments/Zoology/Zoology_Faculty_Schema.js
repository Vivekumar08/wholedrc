const mongoose = require('mongoose');

const Zoology_Faculty_Schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    filter: {
        type: String,
        required: true,
    },
    img_data: {

        file_path: [{
            file_path1: {
                type: String,
                default: null
            },
            file_mimetype1: {
                type: String,
                default: null
            },
        }],
        pdf_path: [{
            pdf_path1: {
                type: String,
                default: "../daulatram/public/images/uploads"
            },
            pdf_mimetype1: {
                type: String,
                default: 'application/pdf'
            },
            value: {
                type: String,
                default: null
            },
        }],
    }
}, {
    timestamps: true
});

const Zoology_Faculty = mongoose.model('Sanskrit_Faculty', Zoology_Faculty_Schema);

module.exports = Zoology_Faculty;