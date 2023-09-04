import * as yup from 'yup'

const errorsSchema = yup.object().shape({
    user: yup.string().email('Formato incorrecto').required('Este campo es OBLIGATORIO'),
    pass: yup.string().min(5, 'Minimo de 5 caracteres').required('Este campo es OBLIGATORIO'),
    repeatPass: yup.string().required('Este campo es OBLIGATORIO')
})

export const errorLogin = yup.object().shape({
    user: yup.string().email('Formato incorrecto').required('Este campo es OBLIGATORIO'),
    pass: yup.string().required('Este campo es OBLIGATORIO'),
})

export const errorProd = yup.object().shape({
    nombre: yup.string().required('Este campo es OBLIGATORIO'),
    precio: yup.string().required('Este campo es OBLIGATORIO'),
    codigo: yup.string().required('Este campo es OBLIGATORIO'),
    descripcion: yup.string().required('Este campo es OBLIGATORIO'),
    categoria: yup.string().required('Este campo es OBLIGATORIO'),
    imagen: yup.string().required('Este campo es OBLIGATORIO'),
    stock: yup.string().required('Este campo es OBLIGATORIO')
})
export default errorsSchema