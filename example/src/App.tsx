import { useState } from 'react'
import {
  checkboxColumn,
  Column,
  createKoreanTextColumn,
  DataSheetGrid,
  keyColumn,
  textColumn
} from '../../src'
import '../../src/style.css'

type Row = {
  active: boolean
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  country: string | null
  zipCode: string | null
  company: string | null
  department: string | null
  position: string | null
  salary: string | null
  startDate: string | null
  notes: string | null
  status: string | null
  priority: string | null
  category: string | null
  tags: string | null
  website: string | null
}

function App() {
  const [data, setData] = useState<Row[]>([
    { active: true, firstName: 'Elon', lastName: 'Musk', email: 'elon@tesla.com', phone: '123-456-7890', address: '1 Rocket Road', city: 'Hawthorne', country: 'USA', zipCode: '90250', company: 'Tesla', department: 'Engineering', position: 'CEO', salary: '1000000', startDate: '2004-01-01', notes: 'Space enthusiast', status: 'Active', priority: 'High', category: 'Tech', tags: 'space, electric', website: 'tesla.com' },
    { active: false, firstName: 'Jeff', lastName: 'Bezos', email: 'jeff@amazon.com', phone: '234-567-8901', address: '410 Terry Ave N', city: 'Seattle', country: 'USA', zipCode: '98109', company: 'Amazon', department: 'Executive', position: 'Founder', salary: '2000000', startDate: '1994-07-05', notes: 'E-commerce pioneer', status: 'Retired', priority: 'Medium', category: 'Retail', tags: 'cloud, retail', website: 'amazon.com' },
    { active: true, firstName: 'Bill', lastName: 'Gates', email: 'bill@gatesfoundation.org', phone: '345-678-9012', address: '500 5th Ave N', city: 'Seattle', country: 'USA', zipCode: '98109', company: 'Microsoft', department: 'Philanthropy', position: 'Co-founder', salary: '500000', startDate: '1975-04-04', notes: 'Philanthropist', status: 'Active', priority: 'High', category: 'Tech', tags: 'philanthropy, tech', website: 'gatesfoundation.org' },
    { active: true, firstName: 'Tim', lastName: 'Cook', email: 'tim@apple.com', phone: '456-789-0123', address: '1 Apple Park Way', city: 'Cupertino', country: 'USA', zipCode: '95014', company: 'Apple', department: 'Executive', position: 'CEO', salary: '1500000', startDate: '2011-08-24', notes: 'Supply chain expert', status: 'Active', priority: 'High', category: 'Tech', tags: 'apple, innovation', website: 'apple.com' },
    { active: false, firstName: 'Mark', lastName: 'Zuckerberg', email: 'mark@meta.com', phone: '567-890-1234', address: '1 Hacker Way', city: 'Menlo Park', country: 'USA', zipCode: '94025', company: 'Meta', department: 'Engineering', position: 'CEO', salary: '1200000', startDate: '2004-02-04', notes: 'Social media', status: 'Active', priority: 'Medium', category: 'Social', tags: 'social, vr', website: 'meta.com' },
  ])

  const columns: Column<Row>[] = [
    {
      ...keyColumn<Row, 'active'>('active', checkboxColumn),
      title: 'Active',
      grow: 0.5,
    },
    {
      ...keyColumn<Row, 'firstName'>('firstName', textColumn),
      title: 'First name',
    },
    {
      ...keyColumn<Row, 'lastName'>('lastName', createKoreanTextColumn({
        formatBlurredInput: (value) => {
          console.log('formatBlurredInput', value)
          return String(value ?? '')
        },
        parseUserInput: (value) => {
          console.log('parseUserInput', value)
          return String(value ?? '')
        },
      })),
      title: 'Last name',
      grow: 2,
    },
    {
      ...keyColumn<Row, 'email'>('email', textColumn),
      title: 'Email',
      grow: 1.5,
    },
    {
      ...keyColumn<Row, 'phone'>('phone', textColumn),
      title: 'Phone',
      grow: 1,
    },
    {
      ...keyColumn<Row, 'address'>('address', textColumn),
      title: 'Address',
      grow: 2,
    },
    {
      ...keyColumn<Row, 'city'>('city', textColumn),
      title: 'City',
      grow: 1,
    },
    {
      ...keyColumn<Row, 'country'>('country', textColumn),
      title: 'Country',
      grow: 1,
    },
    {
      ...keyColumn<Row, 'zipCode'>('zipCode', textColumn),
      title: 'Zip Code',
      grow: 0.8,
    },
    {
      ...keyColumn<Row, 'company'>('company', textColumn),
      title: 'Company',
      grow: 1.5,
    },
    {
      ...keyColumn<Row, 'department'>('department', textColumn),
      title: 'Department',
      grow: 1.2,
    },
    {
      ...keyColumn<Row, 'position'>('position', textColumn),
      title: 'Position',
      grow: 1.2,
    },
    {
      ...keyColumn<Row, 'salary'>('salary', textColumn),
      title: 'Salary',
      grow: 1,
    },
    {
      ...keyColumn<Row, 'startDate'>('startDate', textColumn),
      title: 'Start Date',
      grow: 1,
    },
    {
      ...keyColumn<Row, 'notes'>('notes', textColumn),
      title: 'Notes',
      grow: 2,
    },
    {
      ...keyColumn<Row, 'status'>('status', textColumn),
      title: 'Status',
      grow: 1,
    },
    {
      ...keyColumn<Row, 'priority'>('priority', textColumn),
      title: 'Priority',
      grow: 0.8,
    },
    {
      ...keyColumn<Row, 'category'>('category', textColumn),
      title: 'Category',
      grow: 1,
    },
    {
      ...keyColumn<Row, 'tags'>('tags', textColumn),
      title: 'Tags',
      grow: 1.5,
    },
    {
      ...keyColumn<Row, 'website'>('website', textColumn),
      title: 'Website',
      grow: 1.5,
    },
  ]

  return (
    <div
      style={{
        margin: '50px',
        padding: '50px',
        maxWidth: '1200px',
        background: '#f3f3f3',
      }}
    >
      <DataSheetGrid
        value={data}
        onChange={setData}
        columns={columns}
        stickyLeftColumn={true}
        height={600}
      />
    </div>
  )
}

export default App
