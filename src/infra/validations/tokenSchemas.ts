import * as yup from 'yup';

const tokenSchemas = yup.object().shape({
  email: yup.string()
    .email('O email deve ser válido')
    .required('O email é obrigatório'),
  password: yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default tokenSchemas;