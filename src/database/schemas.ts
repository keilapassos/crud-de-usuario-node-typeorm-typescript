import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    isAdmin: yup.boolean().default(() => { 
      return false
    }),
    // createdOn: yup.date().default(() => { 
    //   return new Date()}).transform( () => { return new Date();
    // }),
    // updatedOn: yup.date().default(() => { 
    //   return new Date()}).transform( () => { return new Date();
    // })    
});
