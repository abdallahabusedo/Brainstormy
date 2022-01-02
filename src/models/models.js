import Joi from "joi";

export const ADMIN = 1, INSTRUCTOR = 2, LEARNER = 3;
export const PDF = 0, VIDEO = 1, QUIZ = 2;
export const ENROLLED = '0' , CREATED = '1';

export const Instructor = Joi.object({
    id: Joi.number(),
    first_name: Joi.string(),
});

export const UserData = Joi.object({
    id:         Joi.number(),
    username:   Joi.string(),
    first_name: Joi.string(),
    last_name:  Joi.string(),
    birthdate:  Joi.date(),
    email:      Joi.string().email({ tlds: {allow: false} }),
    type:       Joi.number().allow(ADMIN, INSTRUCTOR, LEARNER),
});

export const CourseMetadata = Joi.object({
    id:             Joi.number(),
    name:           Joi.string(),
    start_date:     Joi.date().iso(),
    end_date:       Joi.date().iso(),
    description:    Joi.string(),
    instructor:     [ Joi.number().optional(), Instructor ],
    users:          Joi.array().items(Joi.number()),
});


export const CourseProgress = Joi.object({
    total_completeness: Joi.number().max(100).min(0),
    done:               Joi.object().pattern(Joi.number(), Joi.boolean()),  // Map<string, boolean>
});

export const ActivityMetadata = Joi.object({
    id:             Joi.number(),
    courseId:       Joi.number(),
    type:            Joi.number().allow(PDF, VIDEO, QUIZ),
    title:          Joi.string(),
    description:    Joi.string(),
});

export const CourseData = CourseMetadata.options({ presence: 'required' }).keys({
    progress:   CourseProgress.optional(),
    activities: Joi.array().items(ActivityMetadata),
});

export const VideoContent = Joi.object({
    url: Joi.string().uri()
});

export const PDFContent = Joi.object({
    file: Joi.string().base64()
});

export const ActivityContentModel = [VideoContent, PDFContent];

export const ActivityData = ActivityMetadata.keys({
    content: ActivityContentModel
});