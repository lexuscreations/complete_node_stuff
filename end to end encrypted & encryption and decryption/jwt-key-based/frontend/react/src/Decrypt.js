import React, { useState } from 'react';
import axios from 'axios';

const Decrypt = () => {
  const [error, setError] = useState('');
  const [resMsg, setResMsg] = useState('');

  const [secretKey, setSecretKey] = useState('');
  const [dataToDecrypt, setDataToDecrypt] = useState('');

  const decryptCall = async () => {
    try {
      if(!secretKey || !dataToDecrypt) {
        setError("Plz Fill Valid & Required Data In All The Field's!")
        setTimeout(() => setError(''), 4000)
        return
      }
      const res = await axios.post('http://localhost:3001/decrypt', {
        key: secretKey,
        token: dataToDecrypt
      });
      if (res.data.message === "jwt expired" || res.data.message === "invalid signature") {
        setError(res.data.message)
        setResMsg('')
        return
      }
      setResMsg(res.data)
  } catch (error) {
    setError(error)
    setTimeout(() => setError(''), 4000)
  }
};

  return (
    <div>
        <div>
          <p style={{ marginBottom: 5, color: '#8B9A46' }}>Secret-Key*</p>
          <input
              style={{
                padding: 10,
                borderBottomColor: '#7A0BC0',
                marginBottom: 10,
                borderWidth: 1,
                borderRadius: 5,
                height:50
              }}
              placeholder="Enter Secret Key Hear!"
              onChange={e => setSecretKey(e.target.value)}
              value={secretKey}
            />
        </div>

        <div>
          <p style={{ marginBottom: 5, color: '#8B9A46' }}>Token*</p>
          <input
            style={{
              padding: 10,
              marginTop: 2,
              borderBottomColor: '#7A0BC0',
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 5,
              height:50,
            }}
            placeholder="Enter Token To Decrypt..."
            onChange={e => setDataToDecrypt(e.target.value)}
            value={dataToDecrypt}
          />
        </div>
        
        <div>
          <button style={{ alignItems: "center", borderRadius: 10, marginTop: 10, backgroundColor: "#2758", padding: 10 }} onClick={() => decryptCall()}>Decrypt</button>
        </div>

        <div>
            <p style={{ color: 'red', textAlign: 'center', marginTop: 30 }}>{error ? ` ${error} ` : error}</p>
        </div>

        <div>
        {resMsg && <pre style={{ backgroundColor: '#164529c7', color: '#FFFFFF', padding: 10, margin: 10, marginTop: 40 }}>
                {resMsg ?<>
                    Data <br/>
                    &nbsp;{"{"}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key: "{secretKey}",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;token: <input style={{ width: "auto", marginTop: 3 }} value={resMsg} readOnly={true}/>,<br/>
                &nbsp;{"}"}
            </>: resMsg}
            </pre>}
        </div>
    </div>
  );
};

export default Decrypt;
