
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
// import { Tag } from 'primereact/tag';

// import axios from 'axios';

const BootstrapTable = () => {
  const [productDetails, setProductDetails] = useState([]);

  // for fetching the product Details Data
  useEffect(() => {
    apiCall()
  }, []);

  const apiCall = () => {
    const fetchDetails = async () => {
      try {
        const res = await fetch('http://localhost:7000/api/getproductdetails');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log(data.data);
        if (data.success && data.data.length > 0) {
          setProductDetails(data.data);
        } else {
          console.error('Error fetching data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchDetails();
  }




  let emptyProduct = {
    orderId: null,
    productName: '',
    orderValue: 0,
    fullName: '',
    physicalWeight: ''
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);



  // const addProductDetailsModal = () => {
  //   setProduct(emptyProduct);
  //   setSubmitted(false);
  //   setProductDialog(true);
  // }


  // const openNew = () => {
  //   setProduct(emptyProduct);
  //   setSubmitted(false);
  //   setProductDialog(true);
  // };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };





  const saveEditProduct = async () => {
    try {
      const res = await fetch(`http://localhost:7000/api/updateproductdetails/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await res.json();
      const updatedProducts = productDetails.map((p) => (p._id === updatedProduct._id ? updatedProduct : p));
      setProductDetails(updatedProducts);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      setProductDialog(false);
      apiCall()
    } catch (error) {
      console.error('Error updating product:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update product', life: 3000 });
    }
  };



  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };





 ///  delete functional area
  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };



  const deleteProduct = async () => {
    try {
      const res = await fetch(`http://localhost:7000/api/deleteproductdetails/${product._id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete product');
      }

      const deletedProductId = product._id;
      const updatedProducts = productDetails.filter((p) => p._id !== deletedProductId);
      setProductDetails(updatedProducts);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      setDeleteProductDialog(false);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete product', life: 3000 });
    }
  };








  // const deleteAllProducts = async () => {
  //   try {
  //     const res = await fetch('http://localhost:7000/api/deleteallproduct', {
  //       method: 'DELETE',
  //     });

  //     if (!res.ok) {
  //       throw new Error('Failed to delete all products');
  //     }

  //     setProductDetails([]);
  //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'All Products Deleted', life: 3000 });
  //     setDeleteProductsDialog(false);
  //   } catch (error) {
  //     console.error('Error deleting all products:', error);
  //     toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete all products', life: 3000 });
  //   }
  // };



  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i]._id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return id;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  // const deleteSelectedProducts = () => {
  //   let _products = products.filter((val) => !selectedProducts.includes(val));

  //   setProducts(_products);
  //   setDeleteProductsDialog(false);
  //   setSelectedProducts(null);
  //   toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
  // };



  // const deleteAllProducts = async () => {
  //   try {
  //     const res = await fetch('http://localhost:7000/api/deleteallproduct', {
  //       method: 'DELETE',
  //     });

  //     if (!res.ok) {
  //       throw new Error('Failed to delete all products');
  //     }

  //     setProductDetails([]);
  //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'All Products Deleted', life: 3000 });
  //     setDeleteProductsDialog(false);
  //   } catch (error) {
  //     console.error('Error deleting all products:', error);
  //     toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete all products', life: 3000 });
  //   }
  // };





  const deleteSelectedOrAllProducts = async () => {
    if (selectedProducts && selectedProducts.length > 0) {
      // Delete selected products
      const selectedIds = selectedProducts.map(product => product._id);
      try {
        const res = await fetch('http://localhost:6000/api/deleteallproduct', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: selectedIds }),
        });

        if (!res.ok) {
          throw new Error('Failed to delete selected products');
        }

        const updatedProducts = productDetails.filter(p => !selectedIds.includes(p._id));
        setProductDetails(updatedProducts);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Selected Products Deleted', life: 3000 });
        setSelectedProducts(null);

        setDeleteProductsDialog(false);

      } catch (error) {
        console.error('Error deleting selected products:', error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete selected products', life: 3000 });
      }
    } else {
      // Delete all products
      await deleteProduct();
    }
  };




  const onCategoryChange = (e) => {
    let _product = { ...product };

    _product['category'] = e.value;
    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {


    return (
      <div className="flex flex-wrap gap-2">
        {/* <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} /> */}
        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
  };

  // const imageBodyTemplate = (rowData) => {
  //   return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
  // };

  // const priceBodyTemplate = (rowData) => {
  //   return formatCurrency(rowData.price);
  // };

  // const ratingBodyTemplate = (rowData) => {
  //   return <Rating value={rowData.rating} readOnly cancel={false} />;
  // };

  // const statusBodyTemplate = (rowData) => {
  //   return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
  // };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  };

  // const getSeverity = (product) => {
  //   switch (product.inventoryStatus) {
  //     case 'INSTOCK':
  //       return 'success';

  //     case 'LOWSTOCK':
  //       return 'warning';

  //     case 'OUTOFSTOCK':
  //       return 'danger';

  //     default:
  //       return null;
  //   }
  // };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
      <IconField iconPosition="left">
        <InputIcon className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </IconField>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveEditProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedOrAllProducts} />
    </React.Fragment>
  );
  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

        <DataTable
          ref={dt}
          value={productDetails}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column field="orderId" header="Order ID" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="productName" header="Product Name" style={{ minWidth: '16rem' }}></Column>
          <Column field="orderValue" header="Order Value" sortable style={{ minWidth: '10rem' }}></Column>
          <Column field="fullName" header="Customer Details" sortable style={{ minWidth: '10rem' }}></Column>
          <Column field="physicalWeight" header="Billable Weight" sortable style={{ minWidth: '10rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Product Details"
        modal
        className="p-fluid"
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {product.image && (
          <img
            src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
            alt={product.image}
            className="product-image block m-auto pb-3"
          />
        )}
        <div className="field">
          <label htmlFor="orderId" className="font-bold">
            Order Id
          </label>
          <InputText
            id="orderId"
            name='orderId'
            value={product.orderId}
            onChange={(e) => onInputChange(e, 'orderId')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !product.name })}
          />
          {submitted && !productDetails.orderId && <small className="p-error">Order Id is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="productName" className="font-bold">
            Product Name
          </label>
          <InputText
            id="productName"
            name='productName'
            value={product.productName}
            onChange={(e) => onInputChange(e, 'productName')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !product.productName })}
          />
        </div>

        <div className="field">
          <label htmlFor="orderValue" className="font-bold">
            Product Name
          </label>
          <InputText
            id="orderValue"
            name='orderValue'
            value={product.orderValue}
            onChange={(e) => onInputChange(e, 'orderValue')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !product.orderValue })}
          />
        </div>


        <div className="field">
          <label htmlFor="fullName" className="font-bold">
            Costumer Details
          </label>
          <InputText
            id="fullName"
            name='fullName'
            value={product.fullName}
            onChange={(e) => onInputChange(e, 'fullName')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !product.fullName })}
          />
        </div>

        <div className="field">
          <label htmlFor="physicalWeight" className="font-bold">
            Billable Weight
          </label>
          <InputText
            id="physicalWeight"
            name='physicalWeight'
            value={product.physicalWeight}
            onChange={(e) => onInputChange(e, 'physicalWeight')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !product.physicalWeight })}
          />
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProductsDialog}
        style={{ width: '32rem' }}
        breakpoints={{ '960px': '75vw', '641px': '90vw' }}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && <span>Are you sure you want to delete the selected products?</span>}
        </div>
      </Dialog>
    </div>
  );
};

export default BootstrapTable;
