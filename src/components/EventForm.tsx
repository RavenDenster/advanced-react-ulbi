import { Input, Form, DatePicker, Button, Row, Select } from 'antd'
import { Moment } from 'moment'
import React, { FC, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelecor'
import { IEvent } from '../models/IEvent'
import { IUser } from '../models/IUser'
import { formatDate } from '../utils/data'
import { rules } from '../utils/rules'

interface EventFormProps {
  guests: IUser[],
  submit: (event: IEvent) => void
}
 
const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: '',
    date: '',
    description: '',
    guest: '',
  } as IEvent)
  const {user} = useTypedSelector(state => state.auth)

  const selectDate = (date: Moment | null) => {
    if(date) {
      // console.log(formatDate(date?.toDate()))
      setEvent({...event, date:formatDate(date.toDate())})
    }
  }

  const submitForm = () => {
    props.submit({...event, author: user.username})
  }

  return (
        <Form onFinish={submitForm}>
        <Form.Item
          label="Описание"
          name="description"
          rules={[rules.required()]}
        >
            <Input
              onChange={e => setEvent({...event, description: e.target.value})}
              value={event.description}
            />
        </Form.Item>

        <Form.Item
           label="Дата события"
           name="date"
           rules={[rules.required(), rules.isDateAfter('нельзя создать событие в прошлом')]}
        >
          <DatePicker
            //@ts-ignore
            onChange={(data) => selectDate(data)}
          />
        </Form.Item>

        <Form.Item
           label="выберите гостя"
           name="guest"
           rules={[rules.required()]}
        >
          <Select onChange={(guest) => setEvent({...event, guest})}> 
            {props.guests.map(guest =>
                <Select.Option key={guest.username} value={guest.username}>
                  {guest.username}
                </Select.Option>
              )}
          </Select>
        </Form.Item>

        <Row justify='end'>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} >  {/*loading={isLoading} */}
            <Button type="primary" htmlType="submit">
              Создать
            </Button>
          </Form.Item>
        </Row>

    </Form>
  )
}

export default EventForm
