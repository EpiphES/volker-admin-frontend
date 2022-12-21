import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Accordion, InputGroup, Form } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

function MarkersFilter() {
  const {
    searchQuery,
    isPublished,
    mode,
    type, 
    fetchMarkersStatus, 
  } = useSelector(state => state.marker);

  const {currentCity} = useSelector(state => state.city);

  const modeSelect = currentCity.modes.map((mode) => {
    return (<option key={mode.id} value={mode.id}>{mode.title}</option>)
  })

  const formik = useFormik({
    initialValues: {
      searchQuery: searchQuery,
      mode: '',
      type: '',
      isPublished: 'all'
    },
    onSubmit: values => {
      console.log(values);
    },
  });
  return (
    <Accordion defaultActiveKey="0" className='mb-3'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Фильтры</Accordion.Header>
          <Accordion.Body>
            <Form 
              name={`filter`}
              onSubmit={formik.handleSubmit}
              noValidate 
              >
              <fieldset 
                disabled={fetchMarkersStatus === 'loading'}>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>
                    <BsSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder='ключевое слово'
                    aria-label='поиск маркеров'
                    type='text'
                    name='searchQuery'
                    value={formik.searchQuery}
                    onChange={formik.handleChange}
                  />
                </InputGroup>
                <div className='mb-3'>
                  <Form.Check
                    inline
                    label="Опубликованные"
                    name='isPublished'
                    type='radio'
                    value='true'
                    onChange={formik.handleChange}
                  />
                  <Form.Check
                    inline
                    label="НеОпубликованные"
                    name='isPublished'
                    type='radio'
                    value='false'
                    onChange={formik.handleChange}
                  />
                  <Form.Check
                    inline
                    label="Все"
                    name='isPublished'
                    type='radio'
                    value='all'
                    onChange={formik.handleChange}
                  />
                </div>
                <Form.Select 
                  aria-label='выберите режим' 
                  onChange={(e) => {
                    formik.handleChange(e);
                    // handleChangeMode(e);
                  }}
                  name='mode'
                  id={`mode-filter`}
                  value={formik.values.mode}>
                  <option value=''>Вcе</option>
                  {modeSelect}
                </Form.Select>
              </fieldset>
            </Form>            
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
  )
}

export default MarkersFilter