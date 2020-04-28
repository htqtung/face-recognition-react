import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box, boxes }) => {
  //const { leftCol, topRow, rightCol, bottomRow } = box;
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' src={imageURL} alt='' width='500px' height='auto' />
        {/* <div
          className='bounding-box'
          style={{
            top: topRow,
            right: rightCol,
            bottom: bottomRow,
            left: leftCol,
          }}></div> */}
        {boxes.map((box, index) => (
          <div
            className='bounding-box'
            key={index}
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
