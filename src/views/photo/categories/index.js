import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  CForm,
  CFormInput,
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
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
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
  const [photoCategories, setPhotoCategories] = useState([])
  const [value, setValue] = useState(null)
  const [id, setId] = useState(null)
  const [visiableModal, setVisibleModal] = useState(false)
  useEffect(() => {
    axios
      .get(ApiUrl + '/admin/photos/photo_categories')
      .then((response) => {
        setPhotoCategories(response.data.categories) // Set the image URL
        // postData(response.data.location)
      })
      .catch((error) => {
        console.error('Error uploading file', error)
      })
  }, [visiableModal])

  const save = () => {
    if (!id) {
      axios
        .post(ApiUrl + '/admin/photos/photo_categories', {
          name: value,
        })
        .then((response) => {
          setVisibleModal(false)
        })
        .catch((error) => {
          console.error('Error uploading file', error)
        })
    } else {
      axios
        .put(ApiUrl + '/admin/photos/photo_categories/' + id, value)
        .then((response) => {
          setVisibleModal(false)
        })
        .catch((error) => {
          console.error('Error uploading file', error)
        })
    }
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
              <CButton
                color="secondary"
                onClick={() => {
                  setId(null)
                  setVisibleModal(true)
                }}
              >
                <CIcon icon={cilUserPlus} className="me-2" />
                {t(label.addNew)}
              </CButton>
            </CCol>
          </CRow>
          <CTable align="middle" className="mb-0" hover responsive>
            <CTableHead className="fw-semibold text-body-secondary">
              <CTableRow>
                <CTableHeaderCell>{t('No')}</CTableHeaderCell>
                <CTableHeaderCell>{t('name')}</CTableHeaderCell>
                <CTableHeaderCell>{t('operation')}</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {photoCategories.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell>
                    <div>{index + 1}</div>
                  </CTableDataCell>

                  <CTableDataCell>
                    <div>{item.name}</div>
                  </CTableDataCell>

                  <CTableDataCell>
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={() => {
                        // navigate('./edit/' + item._id)
                        setId(item._id)
                        setValue(item.name)
                        setVisibleModal(true)
                      }}
                    >
                      Edit
                    </button>
                    <button type="button" className="btn btn-outline-danger">
                      Delete
                    </button>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <CModal visible={visiableModal} onClose={() => setVisibleModal(false)}>
            <CModalHeader>
              <CModalTitle>Photo Category</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CForm>
                <CFormInput
                  id="exampleFormControlInput1"
                  label="Name"
                  placeholder=""
                  value={value}
                  aria-describedby="exampleFormControlInputHelpInline"
                  onChange={(e) => setValue(e.target.value)}
                />
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisibleModal(false)}>
                Close
              </CButton>
              <CButton color="primary" onClick={save}>
                Save changes
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
