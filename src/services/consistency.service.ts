import File from "../models/schemas/file.schema";
import code from "../resource/common.code";
import { NewCommonError } from "../models/dto/error.dto";

const aggregateFile = async (fileId: string) => {
  try {
    const file = await File.find({ _id: fileId });
    if (!file) {
      return { data: null, err: NewCommonError(code.FILE_NOT_FOUND) };
    }

    const result = await File.aggregate([
      {
        $lookup: {
          from: "households",
          let: { fileId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$file_id", "$$fileId"] } } },
            {
              $lookup: {
                from: "members",
                let: { iden: "$iden" },
                pipeline: [
                  {
                    $match: { $expr: { $eq: ["$iden", "$$iden"] } },
                  },
                ],
                as: "members",
              },
            },
          ],
          as: "households",
        },
      },
    ]);

    return { data: result[0], err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    return { data: err, err: NewCommonError(code.ERR_INTERNAL) };
  }
};

export { aggregateFile };
