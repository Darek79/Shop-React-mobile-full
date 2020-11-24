import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { showData, fetchData } from './../redux/actions/fetchActions';

const Clicker = ({ data, fetchData, showData }) => {
  const [imgArr, setImg] = useState(null);
  useEffect(() => {
    fetchData(
      showData,
      'http://localhost:3000/api/getImages?li=3&fo=newFall2020'
    );
  }, []);
  return (
    <div>
      <h2>test</h2>
      {console.log(data && data.msg, 'DATA123')}
      {data &&
        data.msg.map((el) => {
          console.log(el.photos[0]);
          return (
            <ul>
              <li>
                <img src={`http://localhost:3000${el.photos[0]}`} alt='img' />
              </li>
            </ul>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.fetchReducer.data,
});

export default connect(mapStateToProps, { showData, fetchData })(Clicker);
