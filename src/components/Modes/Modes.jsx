import { Routes, Route } from 'react-router-dom';

// import NewMode from './NewMode';
// import UpdateMode from './UpdateMode';

const Modes = () => {
  return (
    <Routes>
      <Route
        index
        element={<h1>Режимы</h1>}
      />
      {/* <Route
        path='create'
        element={<NewMode />}
      />
      <Route
        path=':id'
        element={<UpdateMode />}
      /> */}
    </Routes>
  );
};
export default Modes;