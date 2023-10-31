import { FC } from 'react'
import styles from './Pagination.module.scss'
import { IPropsPagination } from './types.ts'

const Pagination: FC<IPropsPagination> = ({ meta, handlerChangePage, isLoading }) => {

    const { page, pageCount } = meta

    const pages = []

    for (let index = 1; index <= pageCount; index++) {
        pages.push(index)
    }

    return (
        <div className={ styles.wrapper }>
            <button disabled={ page === 1 || isLoading } onClick={ () => handlerChangePage(page - 1) }>
                &#8249;
            </button>
            {pages.map(p =>
                <button key={ p }
                    disabled={ page === p || isLoading }
                    className={ page === p ? styles.btnActive : '' }
                    onClick={ () => handlerChangePage(p) }
                >{p}
                </button>
            )}
            <button
                disabled={ page === pageCount || isLoading }
                onClick={ () => handlerChangePage(page + 1) }
            >&#8250;</button>
        </div>
    )
}

export default Pagination
