import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
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
  CImage,
  CFormSelect,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilSave, cilBackspace } from '@coreui/icons'
import { label } from 'src/config/label'
const Dashboard = () => {
  const { t } = useTranslation()
  const [file, setFile] = useState(null)
  const [images, setImages] = useState(null)
  const [data, setData] = useState({})
  const [photoCategories, setPhotoCategories] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://localhost:5000/admin/photos/photo_categories')
      .then((response) => {
        setPhotoCategories(response.data.categories) // Set the image URL
      })
      .catch((error) => {
        console.error('Error uploading file', error)
      })
    axios
      .get('http://localhost:5000/admin/photos/photo/' + id)
      .then((response) => {
        setData({ ...response.data, category_id: response.data.category })
      })
      .catch((error) => {
        console.error('Error uploading file', error)
      })
  }, [])
  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }
  useEffect(() => {
    updateData()
  }, [images])

  const onFileUpload = () => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('category', data.category_id)
    axios
      .post('http://localhost:5000/admin/photos/upload', formData)
      .then((response) => {
        // setImageUrl(response.data.location) // Set the image URL
        setImages(response.data.result)
        // updateData(response.data.location)
      })
      .catch((error) => {
        console.error('Error uploading file', error)
      })
  }
  const updateData = () => {
    let { s3_url, s3_webp_url, s3_thumb_url, ...updateData } = data
    if (images)
      updateData = {
        ...data,
        s3_url: images[0].Location,
        s3_webp_url: images[1].Location,
        s3_thumb_url: images[2].Location,
      }
    axios
      .put('http://localhost:5000/admin/photos/photo/' + data._id, updateData)
      .then((response) => {
        navigate('/photo/photos')
        // setImageUrl(response.data.imageUrl) // Set the image URL
      })
      .catch((error) => {
        console.error('Error uploading file', error)
      })
  }
  const save = () => {
    if (file) onFileUpload()
    else updateData(data.s3_url)
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
              <CCardTitle className="fs-4 fw-semibold">{t('Edit Photo')}</CCardTitle>
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
                defaultValue={data.name}
              />
              <CFormSelect
                id="exampleFormControlInput1"
                label="Category"
                onChange={(e) => changeInfo(e, 'category_id')}
                value={data.category_id}
              >
                {photoCategories.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>{' '}
              <CFormInput
                id="exampleFormControlInput1"
                label="Location"
                placeholder=""
                aria-describedby="exampleFormControlInputHelpInline"
                onChange={(e) => changeInfo(e, 'location')}
                defaultValue={data.location}
              />
              <CFormTextarea
                id="exampleFormControlTextarea1"
                label="Description"
                rows={3}
                text="Must be 8-20 words long."
                onChange={(e) => changeInfo(e, 'description')}
                defaultValue={data.description}
              ></CFormTextarea>
              <CFormInput
                type="file"
                id="formFile"
                label="Photo"
                onChange={onFileChange}
                // value={data.s3_url ? data.s3_url : ''}
              />
              <CImage rounded thumbnail src={data.s3_webp_url} width={200} height={200} />
            </CForm>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
