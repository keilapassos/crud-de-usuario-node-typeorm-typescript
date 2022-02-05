import * as yup from 'yup';
import bcrypt from 'bcrypt'

export const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required(),
    createdOn: yup.date().default(() => { 
      return new Date()}).transform( () => { return new Date();
      // return new Date()}).transform( () => { return new Date();
    }),
    updatedOn: yup.date().default(() => { 
      return new Date()}).transform( () => { return new Date();
    })    
});

export const updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
  updatedOn: yup.date().default(() => { 
    return new Date()}).transform( () => { return new Date();
  })  
});
