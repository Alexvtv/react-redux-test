import '../styles/navigation.scss'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"

function Nav(props) {

  const getClassName = (param) => {
    if(window.location.href.indexOf(param) !== -1) {
      return 'link active-link'
    } else {
      return 'link'
    }
  }

  return (
    <div className='navigation'>
    	<Link to='/' style={{textDecoration: 'none'}}>
      	<div className='link link__home'>
      		<img src='/icons/logo.png' />
    		</div>
    	</Link>
      <Link to='/knowledge' style={{textDecoration: 'none'}}>
      	<div className={getClassName('/knowledge')}>
          <img src='/icons/book.png' />
      		<p>База знаний</p>
    		</div>
    	</Link>
    	<Link to='/tasks' style={{textDecoration: 'none'}}>
      	<div className={getClassName('/tasks')}>
          <img src='/icons/tasks.png' />
      		<p>Заявки</p>
    		</div>
    	</Link>
    	<Link to='/employees' style={{textDecoration: 'none'}}>
      	<div className={getClassName('/employees')}>
          <img src='/icons/employees.png' />
      		<p>Сотрудники</p>
    		</div>
    	</Link>
    	<Link to='/clients' style={{textDecoration: 'none'}}>
      	<div className={getClassName('/clients')}>
          <img src='/icons/clients.png' />
      		<p>Клиенты</p>
    		</div>
    	</Link>
    	<Link to='/analytics' style={{textDecoration: 'none'}}>
      	<div className={getClassName('/analytics')}>
          <img src='/icons/analytics.png' />
      		<p>Активы</p>
    		</div>
    	</Link>
    	<Link to='/settings' style={{textDecoration: 'none'}}>
      	<div className={getClassName('/settings')}>
          <img src='/icons/settings.png' />
      		<p>Настройки</p>
    		</div>
    	</Link>
    </div>
  )
}

export default connect()(Nav)