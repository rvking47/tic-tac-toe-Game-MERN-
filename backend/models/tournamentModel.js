import mongoose from "mongoose";

const levelResultSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    playerSymbol: {
        type: String,
        enum: ['X', 'O'],
        required: true
    },
    aiSymbol: {
        type: String,
        enum: ['X', 'O'],
        required: true
    },
    moves: {
        type: [String],
        default: []
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { _id: false });


const tournamentSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    levels: {
        type: [levelResultSchema],
        default: []
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    }
}, { timestamps: true });

const Tournament = mongoose.model("tournament", tournamentSchema);

export default Tournament;