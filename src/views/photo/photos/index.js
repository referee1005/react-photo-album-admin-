import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CAvatar,
  CImage,
  CButton,
  CCard,
  CCardBody,
  CCardSubtitle,
  CCardTitle,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'
import { cilPeople, cilUserPlus } from '@coreui/icons'
import axios from 'axios'
import { label } from 'src/config/label'
import { ApiUrl } from 'src/config'

const Dashboard = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    getPhotos()
  }, [])
  const getPhotos = () => {
    axios
      .get(ApiUrl + '/admin/photos/photo')
      .then((response) => {
        setPhotos(response.data.photos) // Set the image URL
        // postData(response.data.location)
      })
      .catch((error) => {
        console.error('Error uploading file', error)
      })
  }
  const deletePhoto = (id) => {
    axios
      .delete(ApiUrl + '/admin/photos/photo/' + id)
      .then((response) => {
        getPhotos()
      })
      .catch((error) => {
        console.error('Error uploading file', error)
      })
  }
  return (
    <>
      <CCard className="mb-4">
        <CCardBody className="p-4">
          <CRow>
            <CCol>
              <CCardTitle className="fs-4 fw-semibold">{t('Photos')}</CCardTitle>
              <CCardSubtitle className="fw-normal text-body-secondary mb-4">
                {/* {t('registeredUsersCounter', {
                  counter: '1.232.15',
                })} */}
              </CCardSubtitle>
            </CCol>
            <CCol xs="auto" className="ms-auto">
              <CButton color="secondary" onClick={() => navigate('./add')}>
                <CIcon icon={cilUserPlus} className="me-2" />
                {t(label.addNew)}
              </CButton>
            </CCol>
          </CRow>
          <CTable align="middle" className="mb-0" hover responsive>
            <CTableHead className="fw-semibold text-body-secondary">
              <CTableRow className="text-center">
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>{t('name')}</CTableHeaderCell>
                <CTableHeaderCell className="text-center">{t('category')}</CTableHeaderCell>
                <CTableHeaderCell>{t('location')}</CTableHeaderCell>
                <CTableHeaderCell>{t('description')}</CTableHeaderCell>
                <CTableHeaderCell>{t('operation')}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="text-center">
              {photos.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    {/* <CAvatar
                      size="md"
                      shape="rounded"
                      src={item.s3_url.replace(
                        'https://photogallerystorage.s3.us-west-1.amazonaws.com',
                        'https://d24sl72mck15fx.cloudfront.net',
                      )}
                      
                    /> */}
                    <CImage rounded thumbnail src={item.s3_thumb_url} width={40} height={30} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.category ? item.category.name : ''}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.location}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.description}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={() => {
                        navigate('./edit/' + item._id)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => deletePhoto(item._id)}
                    >
                      Delete
                    </button>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
