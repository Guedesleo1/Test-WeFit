import * as yup from 'yup';

const authenticationSchemas = yup.object().shape({
  name: yup.string()
    .required('O nome é obrigatório'),
  email: yup.string()
    .email('O email deve ser válido')
    .required('O email é obrigatório'),
  password: yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default authenticationSchemas;