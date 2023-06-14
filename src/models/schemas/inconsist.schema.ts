import mongoose, { Schema } from "mongoose";

const inconsistSchema = new Schema({
  member_id: { type: String, required: true },
  iden: { type: String, required: true },
  file_id: { type: String, required: true },
  total_errors: { type: Number, required: true },
  inconsist: {
    step1: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step2: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step3: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step4: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step5: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step6: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step7: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step8: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step9: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step10: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
    step11: {
      codes: [
        {
          type: String,
        },
      ],
      fields: [
        {
          type: String,
        },
      ],
    },
  },
});

export default mongoose.model("Inconsist", inconsistSchema);
