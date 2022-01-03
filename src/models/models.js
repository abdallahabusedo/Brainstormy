import Joi from "joi";

export const ADMIN = 1, INSTRUCTOR = 2, LEARNER = 3;
export const PDF = 0, VIDEO = 1, QUIZ = 2;
export const ENROLLED = '0' , CREATED = '1';

export const CourseMetadata = Joi.object({
    id:             Joi.number(),
    name:           Joi.string(),
    start_date:     Joi.date().iso(),
    end_date:       Joi.date().iso(),
    description:    Joi.string(),
    instructorId:   Joi.number(),
    instructorName: Joi.string(),
    users:          Joi.array().items(Joi.number()),
});


export const CourseProgress = Joi.object({
    total_completeness: Joi.number().max(100).min(0),
    activities:         Joi.array().items(Joi.object({ activityId: Joi.number() })),
});

export const ActivityData = Joi.object({
    id:         Joi.number(),
    type:       Joi.number().allow(PDF, VIDEO, QUIZ),
    title:      Joi.string(),
    video_url:  Joi.string().optional()
});

export const CourseData = CourseMetadata.options({ presence: 'required' }).keys({
    progress:   CourseProgress.optional(),
    activities: Joi.array().items(ActivityData),
});
