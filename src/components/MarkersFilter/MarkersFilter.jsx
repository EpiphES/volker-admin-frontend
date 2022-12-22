import { useEffect } from 'react';
import { Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

function MarkersFilter({onSubmit, onReset}) {
  const {
    fetchMarkersStatus,
  } = useSelector(state => state.marker);

  const {currentCity} = useSelector(state => state.city);

  const modeSelect = currentCity.modes.map((mode) => {
    return (<option key={mode.id} value={mode.id}>{mode.title}</option>)
  });

  const formik = useFormik({
    initialValues: {
      searchQuery: '',
      mode: '',
      type: '',
      isPublished: 'all',
    },
    onSubmit: values => {
      onSubmit(values);
    },
  });

  const typeSelect = currentCity.modes.find((item) => item.id === parseInt(formik.values.mode))?.markerTypes.map((type) => {
    return (<option key={type.id} value={type.id}>{type.title}</option>)
  });

  useEffect(() => {
    if(currentCity) {
      formik.handleReset();
    }
  }, [currentCity])

  return (
    <Accordion className='mb-3'>
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
                    value={formik.values.searchQuery}
                    onChange={formik.handleChange}
                  />
                </InputGroup>

                <Form.Group className='mb-3'>
                  <Form.Check
                    inline
                    label="Опубликованные"
                    name='isPublished'
                    type='radio'
                    value='true'
                    checked={formik.values.isPublished === 'true'}
                    onChange={formik.handleChange}
                  />
                  <Form.Check
                    inline
                    label="Неопубликованные"
                    name='isPublished'
                    type='radio'
                    value='false'
                    checked={formik.values.isPublished === 'false'}
                    onChange={formik.handleChange}
                  />
                  <Form.Check
                    inline
                    label='Все'
                    name='isPublished'
                    type='radio'
                    value='all'
                    checked={formik.values.isPublished === 'all'}
                    onChange={formik.handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label className='h6 mb-3' htmlFor={`mode-filter`}>
                    Выберите режим
                  </Form.Label>
                  <Form.Select
                    aria-label='выберите режим'
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.values.type = '';
                    }}
                    name='mode'
                    id={`mode-filter`}
                    value={formik.values.mode}>
                    <option value=''>Вcе</option>
                    {modeSelect}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label className='h6 mb-3' htmlFor={`type-filter`}>
                    Выберите тип
                  </Form.Label>
                  <Form.Select
                    aria-label='выберите тип'
                    onChange={formik.handleChange}
                    name='type'
                    id={`type-filter`}
                    value={formik.values.type}>
                    <option value=''>Все</option>
                    {typeSelect}
                  </Form.Select>
                </Form.Group>
                <Button
                  variant='primary'
                  type='submit'
                  aria-label='Применить'
                  className='mt-4'>
                  {fetchMarkersStatus === 'loading' ? 'Загрузка...' : 'Применить'}
                </Button>

                <Button
                  variant='primary'
                  type='reset'
                  aria-label='очистить изменения'
                  onClick={(e) => {
                    formik.handleReset(e);
                    onReset();
                  }}
                  className='ms-2 mt-4'>
                  Сбросить
                </Button>

              </fieldset>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
  )
}
export default MarkersFilter;