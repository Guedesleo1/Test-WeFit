import * as yup from 'yup';

const usersSchemas =  yup.object().shape({
  documentType: yup.boolean().required(),
  document: yup.string()
    .required('O documento é obrigatório')
    .test('is-valid-document', 'O documento deve ter 11 ou 14 dígitos', value =>
      typeof value === 'string' && (value.length === 11 || value.length === 14)),
  telephone: yup.string().nullable().notRequired(),
  cellphone: yup.string()
    .required('O celular é obrigatório')
    .test('is-valid-cellphone', 'O celular deve ter 9 dígitos', value =>
      typeof value === 'string' && value.length === 9),
  zipCode: yup.string()
    .required('O CEP é obrigatório')
    .length(8, 'O CEP deve ter exatamente 8 caracteres'),
  addressNumber: yup.string().required(),
  complement: yup.string().nullable().notRequired()
});

export default usersSchemas;