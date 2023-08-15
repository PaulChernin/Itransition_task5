import { Person } from "../types/Person"
import { Table } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"

type PersonTableProps = {
    people: Array<Person>,
    add: () => void
}

const columns = [
    {
        title: '#',
        dataIndex: 'index'
    },
    {
        title: 'Id',
        dataIndex: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
    {
        title: 'Phone',
        dataIndex: 'phoneNumber',
    }
]

const PersonTable = ({ people, add }: PersonTableProps) => {
    const dataSource = people.map((person, i) => {
        return {
            key: person.id,
            index: i + 1,
            ...person
        }
    })

    return <>
        <InfiniteScroll
            dataLength={dataSource.length}
            next={add}
            hasMore={true}
            loader={<h4>Loading</h4>}
            scrollThreshold={'200px'}
        >
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        </InfiniteScroll>
    </>
}

export default PersonTable