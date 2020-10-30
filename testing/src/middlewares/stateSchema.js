import * as yup from 'yup'

export default 
    yup.object().shape({
        comments: yup.array().of(
            yup.string()
        ).required(),
        auth: 
            yup.boolean()
    });