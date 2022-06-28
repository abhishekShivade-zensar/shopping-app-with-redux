import React,{Fragment} from "react";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
import { useSelector } from "react-redux/es/exports";

    const CategoriesPreview = () => {

        const categoriesMap=useSelector(selectCategoriesMap)

        return (
            <Fragment >
                {
                    Object.keys(categoriesMap).map((title) => {
                        const products = categoriesMap[title]
                        return <CategoryPreview key={title} title={title} products={products} />
                    })
                }
            </Fragment>
        )
    }

export default CategoriesPreview