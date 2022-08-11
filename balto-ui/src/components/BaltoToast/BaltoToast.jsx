import Toast from 'react-bootstrap/Toast'
import DogIcon from '../../assets/paw icon.png'

export default function BaltoToast({ show=false, setShow=()=>{}, header="Balto", body}) {
    
    return (
      <div aria-live="polite" aria-atomic="true">
        <Toast onClose={()=>setShow(false)} show={show} delay={3000} autohide className='update-toast' >
          <Toast.Header>
            <img src={DogIcon} className="dog-icon-toast" alt="dog paw"/>
            <strong className="me-auto">{header}</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          {body ? <Toast.Body>{body}</Toast.Body> : null }
        </Toast>
      </div>
    );
  }
