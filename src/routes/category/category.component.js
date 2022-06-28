import React, { useState, useEffect } from 'react'
import './category.styles.scss'
import { useParams } from 'react-router-dom'
import ProductCard from '../../component/product-card/product-card.component'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { selectCategoriesMap } from '../../store/categories/categories.selector'

const Category = () => {
    const { category } = useParams()
    const categoriesMap=useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h3 className='title' >{category}</h3>
            <div className='category-container' >
                {
                    products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </Fragment>
    )
}

export default Category