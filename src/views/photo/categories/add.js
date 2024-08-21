import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import {
  CButton,
  CCard,
  CForm,
  CFormInput,
  CCardBody,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CRow,
  CFormTextarea,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { cilSave, cilBackspace } from '@coreui/icons'
import { label } from 'src/config/label'
const Dashboard = () => {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  // const [imageUrl, setImageUrl] = useState('')
  const [data, setData] = useState(null)
  const navigate = useNavigate()

  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const onFileUpload = () => {
    const formData = new FormData()
    formData.append('file', file)

    axios
      .post('http://localhost:5000/admin/photos/upload', formData)
      .then((response) => {
        // setImageUrl(response.data.location) // Set the image URL
        postData(response.data.result)
      })
      .catch((error) => {
        console.error('Error uploading file', error)
      })
  }
  const postData = (url) => {
    axios
      .post('http://localhost:5000/admin/photos/photo', {
        ...data,
        urls: url,
      })
      .then((response) => {
        navigate('/photo/photos')
        // setImageUrl(response.data.imageUrl) // Set the image URL
      })
      .catch((error) => {
        console.error('Error uploading file', error)
      })
  }
  const save = () => {
    onFileUpload()
  }
  const changeInfo = (e, key) => {
    setData({ ...data, [key]: e.target.value })
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardBody className="p-4">
          <CRow>
            <CCol>
              <CCardTitle className="fs-4 fw-semibold">{t('Add Photo')}</CCardTitle>
              <CCardSubtitle className="fw-normal text-body-secondary mb-4">
                {/* {t('registeredUsersCounter', {
                  counter: '1.232.15',
                })} */}
              </CCardSubtitle>
            </CCol>
            <CCol xs="auto" className="ms-auto">
              <CButton color="secondary" onClick={save}>
                <CIcon icon={cilSave} className="me-2" />
                {t(label.save)}
              </CButton>
              <CButton color="danger" onClick={() => navigate(-1)} style={{ marginLeft: '1rem' }}>
                <CIcon icon={cilBackspace} className="me-2" />
                {t(label.cancel)}
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CForm>
              <CFormInput
                id="exampleFormControlInput1"
                label="Name"
                placeholder="name is required"
                aria-describedby="exampleFormControlInputHelpInline"
                onChange={(e) => changeInfo(e, 'name')}
              />
            </CForm>
            <CForm>
              <CFormInput
                id="exampleFormControlInput1"
                label="Location"
                placeholder=""
                aria-describedby="exampleFormControlInputHelpInline"
                onChange={(e) => changeInfo(e, 'location')}
              />
            </CForm>
            <CForm>
              <CFormTextarea
                id="exampleFormControlTextarea1"
                label="Description"
                rows={3}
                text="Must be 8-20 words long."
                onChange={(e) => changeInfo(e, 'description')}
              ></CFormTextarea>
            </CForm>
            <CForm>
              <CFormInput
                type="file"
                id="formFile"
                label="Photo"
                onChange={onFileChange}
                required
              />
            </CForm>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
