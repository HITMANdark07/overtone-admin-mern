// mport React from "react";

// export default function AddProductSKU() {
//   let errors = "";
//   let productloading = false;
//   let productsubloading = false;

//   const onSubmit = () => {};
//   const onSubmitForm = () => {};
//   const onChange = () => {};

//   const expenseAccount = "";
//   const quantity = "";
//   const recorder = "";
//   const inventoryAsset = "";
//   const taxable = "";
//   const incomeAccount = "";
//   const type = "";
//   const sku = "";
//   const salePrice = "";
//   const productSubName = "";
//   const saleDesc = "";
//   const purchaseCost = "";
//   const purchaseDesc = "";

//   return (
//     <div>
//       <form
//         className='kt-form kt-form--fit kt-form--label-right'
//         onSubmit={onSubmitForm}
//       >
//         <div className='kt-portlet__body'>
//           <div className='form-group row'>
//             <label className='col-lg-2 col-form-label'>Product Name:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='productSubName'
//                 onChange={onChange}
//                 value={productSubName}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>
//                 {errors.productSubName}
//               </span>
//             </div>

//             <label className='col-lg-2 col-form-label'>Sale Description:</label>
//             <div className='col-lg-3'>
//               <textarea
//                 rows='5'
//                 required
//                 name='saleDesc'
//                 onChange={onChange}
//                 value={saleDesc}
//                 className='form-control'
//                 placeholder=''
//               ></textarea>
//               <span className='form-text text-danger'>{errors.saleDesc}</span>
//             </div>
//           </div>

//           <div className='form-group row'>
//             <label className='col-lg-2 col-form-label'>SKU:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='sku'
//                 onChange={onChange}
//                 value={sku}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>{errors.sku}</span>
//             </div>

//             <label className='col-lg-2 col-form-label'>Type:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='type'
//                 onChange={onChange}
//                 value={type}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>{errors.type}</span>
//             </div>
//           </div>

//           <div className='form-group row'>
//             <label className='col-lg-2 col-form-label'>Sale Price:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='salePrice'
//                 onChange={onChange}
//                 value={salePrice}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>{errors.salePrice}</span>
//             </div>

//             <label className='col-lg-2 col-form-label'>Taxable:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='taxable'
//                 onChange={onChange}
//                 value={taxable}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>{errors.taxable}</span>
//             </div>
//           </div>

//           <div className='form-group row'>
//             <label className='col-lg-2 col-form-label'>Income Account:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='incomeAccount'
//                 onChange={onChange}
//                 value={incomeAccount}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>
//                 {errors.incomeAccount}
//               </span>
//             </div>

//             <label className='col-lg-2 col-form-label'>
//               Purchase Description:
//             </label>
//             <div className='col-lg-3'>
//               <textarea
//                 rows='5'
//                 required
//                 name='purchaseDesc'
//                 onChange={onChange}
//                 value={purchaseDesc}
//                 className='form-control'
//                 placeholder=''
//               ></textarea>
//               <span className='form-text text-danger'>
//                 {errors.purchaseDesc}
//               </span>
//             </div>
//           </div>

//           <div className='form-group row'>
//             <label className='col-lg-2 col-form-label'>Purchase Cost:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='purchaseCost'
//                 onChange={onChange}
//                 value={purchaseCost}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>
//                 {errors.purchaseCost}
//               </span>
//             </div>

//             <label className='col-lg-2 col-form-label'>Expense Account:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='expenseAccount'
//                 onChange={onChange}
//                 value={expenseAccount}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>
//                 {errors.expenseAccount}
//               </span>
//             </div>
//           </div>

//           <div className='form-group row'>
//             <label className='col-lg-2 col-form-label'>Quantity:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='quantity'
//                 onChange={onChange}
//                 value={quantity}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>{errors.quantity}</span>
//             </div>

//             <label className='col-lg-2 col-form-label'>Recorder:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='recorder'
//                 onChange={onChange}
//                 value={recorder}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>{errors.recorder}</span>
//             </div>
//           </div>
//           <div className='form-group row'>
//             <label className='col-lg-2 col-form-label'>Inventory Asset:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='inventoryAsset'
//                 onChange={onChange}
//                 value={inventoryAsset}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>
//                 {errors.inventoryAsset}
//               </span>
//             </div>
//             <label className='col-lg-2 col-form-label'>Quantity As Date:</label>
//             <div className='col-lg-3'>
//               <input
//                 type='text'
//                 required
//                 name='quantityAsDate'
//                 onChange={onChange}
//                 // value={quantityAsDate}
//                 className='form-control'
//                 placeholder=''
//               />
//               <span className='form-text text-danger'>
//                 {errors.quantityAsDate}
//               </span>
//             </div>
//           </div>

//           <div className='form-group row'>
//             <label className='col-lg-2 col-form-label'>isEnabled:</label>
//             <div className='col-lg-3'>
//               <select
//                 required
//                 name='isEnabled'
//                 onChange={onChange}
//                 // value={isEnabled}
//                 className='form-control'
//                 placeholder=''
//               >
//                 <option value=''>Select isEnabled</option>
//                 <option value='Yes'>Yes</option>
//                 <option value='No'>No</option>
//               </select>
//               <span className='form-text text-danger'>{errors.isEnabled}</span>
//             </div>
//           </div>
//         </div>
//         <div className='kt-portlet__foot kt-portlet__foot--fit-x'>
//           <div className='kt-form__actions'>
//             <div className='row'>
//               <div className='col-lg-3 d-flex justify-content-around'>
//                 <button
//                   type='submit'
//                   className={`btn btn-success ${
//                     productsubloading
//                       ? "kt-spinner kt-spinner--sm kt-spinner--light"
//                       : ""
//                   }`}
//                 >
//                   Submit
//                 </button>
//                 <button
//                   type='button'
//                   //   onClick={onReset}
//                   className='btn btn-secondary'
//                 >
//                   Cancel
//                 </button>
//               </div>
//               <div className='col-lg-10' />
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }
