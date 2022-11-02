import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import {
  detailsProduct,
  updateProductAction,
} from 'redux/actions/productActions';
import { PRODUCT_UPDATE_RESET } from 'redux/constants/productConstants';
import LoadingBox from 'components/messages/LoadingBox';
import MessageBox from 'components/messages/MessageBox';

function ProductForm(props) {
  const productId = props.match.params.id;

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const [pk, setPk] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [description, setDescription] = useState('');
  const [percentCarbs, setPercentCarbs] = useState('');
  const [percentFat, setPercentFat] = useState('');
  const [percentProtein, setPercentProtein] = useState('');
  const [calories, setCalories] = useState('');
  const [fat, setFat] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [image, setImage] = useState('');
  const [sales, setSales] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productList');
    }
    if (!product || product._id !== productId) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setPk(product.pk);
      setCategory(product.category);
      setTitle(product.title);
      setImage(product.image);
      setIngredient(product.ingredient);
      setPercentProtein(product.percentProtein);
      setPercentFat(product.percentFat);
      setPercentCarbs(product.percentCarbs);
      setDescription(product.description);
      setCalories(product.calories);
      setFat(product.fat);
      setPrice(product.price);
      setCountInStock(product.countInStock);
      setSales(product.sales);
    }
  }, [dispatch, product, productId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAction({
        _id: productId,
        pk,
        category,
        title,
        image,
        ingredient,
        percentProtein,
        percentFat,
        percentCarbs,
        description,
        calories,
        fat,
        price,
        countInStock,
        sales,
      }),
    );
  };

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const titleForm = product?.pk === 0 ? 'Add Product' : 'Update Product';

  return (
    <section>
      <div className="form-edit">
        <form className="form-details" onSubmit={submitHandler}>
          <header className="header">
            <h3>{titleForm}</h3>
          </header>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div className="inputs">
                <label htmlFor="pk">Pk</label>
                <input
                  id="pk"
                  type="text"
                  placeholder="Enter product's Pk"
                  value={pk}
                  onChange={(e) => setPk(e.target.value)}
                />
              </div>
              <div className="inputs">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  type="text"
                  placeholder="Enter product's Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="title">Title of Product</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter product's Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="imageFile">Image File</label>
                <input
                  type="file"
                  id="imageFile"
                  className="file-input"
                  accept=".jpg"
                  label="Choose Image"
                  onChange={uploadFileHandler}
                ></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                  <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
              </div>

              <div className="inputs">
                <label htmlFor="Ingredient">Ingredients</label>
                <textarea
                  id="Ingredient"
                  type="text"
                  placeholder="Enter product's Ingredient"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="PercentProtein">Percent Protein</label>
                <input
                  id="PercentProtein"
                  type="text"
                  placeholder="Enter product's Percent Protein"
                  value={percentProtein}
                  onChange={(e) => setPercentProtein(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="PercentFat">Percent Fat</label>
                <input
                  id="PercentFat"
                  type="text"
                  placeholder="Enter product's Percent Fat"
                  value={percentFat}
                  onChange={(e) => setPercentFat(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="PercentCarbs">Percent Carbs</label>
                <input
                  id="PercentCarbs"
                  type="text"
                  placeholder="Enter product's Percent Carbs"
                  value={percentCarbs}
                  onChange={(e) => setPercentCarbs(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  type="text"
                  placeholder="Enter product's Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="Calories">Calories</label>
                <input
                  id="Calories"
                  type="text"
                  placeholder="Enter product's Calories"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="Fat">Fat</label>
                <input
                  id="Fat"
                  type="text"
                  placeholder="Enter product's Fat"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="Price">Price</label>
                <input
                  id="Price"
                  type="text"
                  placeholder="Enter product's Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="Sales">Sales</label>
                <input
                  id="Sales"
                  type="text"
                  placeholder="Enter product's Calories"
                  value={sales}
                  onChange={(e) => setSales(e.target.value)}
                />
              </div>

              <div className="inputs">
                <label htmlFor="CountInStock">Available</label>
                <input
                  id="CountInStock"
                  type="number"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>

              <button>{titleForm}</button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default ProductForm;
