import React from 'react'
import { danger } from '../util/colors'

export default ({field, label}) => <div>
    <label forHtml={field.name}>{label}</label>
    <input type='text' className="u-full-width" {...field} />
    {field.touched && field.error && <div style={{color: 'white', backgroundColor: danger}}>{field.error}</div>}
</div>