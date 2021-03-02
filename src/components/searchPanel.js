import '../styles/tasks.scss'
import { useState } from 'react'

function SearchPanel() {

  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='search-panel col-12'>
    	<p>
        <input 
        	value={searchValue} 
        	onChange={(event) => setSearchValue(event.target.value)}
        	placeholder='Введите Фамилию, Статус, Приоритет, Тег и т.д. чтобы найти заявку' 
        />
        <img src='/icons/search.png' />
      </p>
    </div>
  )
}

export default SearchPanel