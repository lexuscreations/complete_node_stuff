import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import './Encrypt.css'

const Encrypt = () => {
  const [error, setError] = useState('');
  const [resMsg, setResMsg] = useState('');

  const [algorithm, setAlgorithm] = useState('HS256');
  const [expiresIn, setExpiresIn] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [dataToEncrypt, setDataToEncrypt] = useState('');
  const [copy2clipboardBtnCss, setCopy2clipboardBtnCss] = useState({ color: 'rgb(68, 68, 108)', float: 'right', cursor: 'pointer', margin: '5px 17px' });

  const encryptCall = async () => {
    try {
      if(!algorithm || !secretKey || !dataToEncrypt) {
        setError("Plz Fill Valid & Required Data In All The Field's!")
        setTimeout(() => setError(''), 4000)
        return
      }
      const res = await axios.post('http://localhost:3001/encrypt', {
        key: secretKey,
        expiresIn,
        algorithm,
        data: dataToEncrypt
      });
      setResMsg(res.data)
    } catch (error) {
      setError(error)
    }
  };

  const copy2clipboardBtn = () => {
    setCopy2clipboardBtnCss({ color: '#9a51b2', float: 'right', cursor: 'pointer', margin: '5px 17px' })
    setTimeout(() => setCopy2clipboardBtnCss({ color: 'rgb(68, 68, 108)', float: 'right', cursor: 'pointer', margin: '5px 17px' }), 250)
    navigator.clipboard.writeText(JSON.stringify({
      key: secretKey,
      token: resMsg
    }));
  }

  return (
    <div>
        <div>
          <p style={{ marginBottom: 5, color: '#8B9A46' }}>Secret-Key*</p>
          <input
              className="inputFld"
              placeholder="Type Secret Key Hear!"
              onChange={e => setSecretKey(e.target.value)}
              value={secretKey}
            />
        </div>

        <div>
          <p style={{ marginBottom: 5, color: '#8B9A46' }}>expiresIn (Optional)</p>
          <input
              className="inputFld"
              placeholder="Type expiresIn Time Hear"
              onChange={e => setExpiresIn(e.target.value)}
              value={expiresIn}
            />
        </div>

        <div>
          <p style={{ marginBottom: 5, color: '#8B9A46' }}>Data/Message*</p>
          <input
            className="inputFld"
            placeholder="Type some data/message to encrypt..."
            onChange={e => setDataToEncrypt(e.target.value)}
            value={dataToEncrypt}
          />
        </div>
        
        <div>
          <p style={{ marginBottom: 5, color: '#8B9A46' }}>Select Algorithm*</p>
          <select
            value={algorithm}
            onChange={e => setAlgorithm(e.target.value)}
            style={{ color: 'green' }}
          >
            <option label="HS256" value="HS256" />
            <option label="HS384" value="HS384" />
            <option label="HS512" value="HS512" />
          </select>
        </div>

        <div>
          <button style={{ alignItems: "center", borderRadius: 10, marginTop: 10, backgroundColor: "#2758", padding: 10 }} onClick={() => encryptCall()}>Encrypt</button>
        </div>

        <div>
          <p style={{ backgroundColor: '#58142d7d', color: '#FFFFFF', padding: 10, margin: 10, marginTop: 40 }}>
          Preview<br/>
          &nbsp;{"{"}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key: "{secretKey}",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;expiresIn: "{expiresIn}",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: "{dataToEncrypt}",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;algorithm: "{algorithm}"<br/>
                &nbsp;{"}"}
          </p>
        </div>

        <div>
            <p style={{ color: 'red', textAlign: 'center', marginTop: 30 }}>{error ? ` ${error} ` : error}</p>
        </div>

        <div>
            {resMsg && <>
              <FontAwesomeIcon icon={faCopy} style={copy2clipboardBtnCss} onClick={() => copy2clipboardBtn()} />
              <pre style={{ backgroundColor: '#164529c7', color: '#FFFFFF', padding: 10, margin: 10, marginTop: 40 }}>
                  {resMsg ?<>
                      Share This With Recivers<br/>
                      &nbsp;{"{"}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key: "{secretKey}",<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;token: "<input style={{ width: "auto", marginTop: 3 }} value={resMsg} readOnly={true}/>",<br/>
                  &nbsp;{"}"}
              </>: resMsg}
              </pre>
            </>}
        </div>
    </div>
  );
};

export default Encrypt;
