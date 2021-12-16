import { array, binary, boolean, date, number, object, string } from "joi";


export const CourseMetadata = object({
    id: string(),
    name: string(),
    start_date: date(),
    end_date: date(),
    description: string(),
    instructor_id: string(),
});

export const CourseProgress = object({
    total_completeness: number().max(100).min(0),
    done: object.pattern(string(), boolean()),
});

export const ActivityMetadata = object({
    id: string(),
    type: string().allow('video', 'pdf'),
    title: string(),
    description: string(),
});

export const CourseData = CourseMetadata.options({ presence: 'required' }).keys({
    progress: CourseProgress.optional(),
    activiies: array().items(ActivityMetadata),
});

export const VideoContent = object({
    url: string().uri()
});

export const PDFContent = binary();

export const ActivityContent = [VideoContent, PDFContent];

export const ActivityData = ActivityMetadata.keys({
    content: ActivityContent
});