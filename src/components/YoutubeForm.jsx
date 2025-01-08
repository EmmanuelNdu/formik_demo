import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues =  {
    name:"Emmanuel",
    email:"",
    channel:"",
    comments:"",
    address:"",
    socials:{
        facebook: '',
        twitter: ''
    },
    phoneNumbers:['', ''],
    phNumbers: ['']
}

const savedValues =  {
    name:"Emmanuel",
    email:"E@example.com",
    channel:"Cartervlog",
    comments:"Carter world",
    address:"30, Downing ",
    socials:{
        facebook: '',
        twitter: ''
    },
    phoneNumbers:['', ''],
    phNumbers: ['']
}

const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    console.log('submit props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string()
    .email('Invalid email format')
    .required('Required'),
    channel: Yup.string().required('Required')
})

const validateComments = value => {
    let error
    if(!value) {
        error = 'Required'
    }
    return error
}

const YoutubeForm = () => {
    const [ formValues, setFormValues ] = useState(null)
  return (
    <Formik
    initialValues={formValues || initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    enableReinitialize
    // validateOnMount
    >
        {
            formik => {
                console.log('Formik props', formik)
                return (

                    <Form>
            <div className='form-control'>
            <label htmlFor='name'>Name</label>
            <Field type='text' id='name'name='name'/>
          <ErrorMessage name='name' component={TextError}/>
            </div> 

            <div className='form-control'>
            <label htmlFor='email'>Email</label>
            <Field type='email'id='email'name='email'/>
           <ErrorMessage name='email'>
            {errorMsg => <div className='error'>{errorMsg}</div>}
           </ErrorMessage>
            </div> 

            <div className='form-control'>
            <label htmlFor='channel'>Channel</label>
            <Field 
            type='text'
            id='channel'
            name='channel'
            placeholder='Youtube channel name'
            />
           <ErrorMessage name='channel' />
            </div>

            <div className='form-control'>
                <label htmlFor='comments' >comments</label>
                <Field as ='textarea' 
                id='comments' 
                name='comments'
                validate = {validateComments}
                />
                <ErrorMessage name='comments' component={TextError} />
                </div> 

                <div className='form-control'>
                    <label htmlFor='address'>Address</label>
                    <FastField name='address'>
                        {
                            (props) => {
                                console.log('Field render')
                                const {field, form, meta} = props
                                console.log('Render props', props)
                                return<div>
                                    <input type='text' id='address' { ...Field}/>
                                    {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                </div>
                            }
                        }
                    </FastField>
                </div>

                <div className='form-control'>
                    <label htmlFor='facebook'>Facebook Profile</label>
                    <Field type='text' id='facebook' name='social.facebook' />
                </div>

                <div className='form-control'>
                    <label htmlFor='facebook'>Twitter Profile</label>
                    <Field type='text' id='twitter' name='social.twitter' />
                </div>

                <div className='form-control'>
                    <label htmlFor='primaryPh'>Primary phone number</label>
                    <Field type='text' id='primaryPh' name='phoneNumbers[0]'/>
                </div>

                <div className='form-control'>
                    <label htmlFor='secondaryPh'>Secondary phone number</label>
                    <Field type='text' id='secondaryPh' name='phoneNumbers[1]'/>
                </div>

                <div className='form-control'>
                    <label>List of Phone Numbers</label>
                    <FieldArray name='phNumbers'>
                        {
                            (fieldArrayProps) => {
                                const { push, remove, form } = fieldArrayProps
                                const {values} = form
                                const {phNumbers}  = values 
                                console.log('Form error', form.errors)
                                return <div>
                                    {phNumbers.map((phNumber, index) => (
                                            <div key={index}>
                                                <Field name={`phNumbers[${index}]`} />
                                                {index > 0 && (
                                                        <button type='button' onClick={() => remove(index)}> - </button>
                                                )}
                                                
                                                <button type='button' onClick={() => push('')}> + </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        }
                    </FieldArray>
                </div>
{/* 
            <button type='button' onClick={() => formik.validateField('comments')}>
                Validate comments
                </button>
            <button type='button' onClick={() => formik.validateForm()}>
                Validate all
                </button>
                <button type='button' onClick={() => formik.setFieldTouched('comments')}>
             Visit comments
                </button>
            <button type='button' onClick={() => formik.setTouched({
                name: true,
                email: true,
                channel: true,
                comments: true
            })}>
                Visit Field
                </button> */}
                <button type='button' onClick={() => setFormValues(savedValues)}>
                    Load saved Data
                    </button>
            <button 
            type='submit' 
            disabled={!formik.isValid || formik.isSubmitting }>Submit</button>
        </Form>

                )
            }
        }
        
        
    </Formik>
  )
}

export default YoutubeForm