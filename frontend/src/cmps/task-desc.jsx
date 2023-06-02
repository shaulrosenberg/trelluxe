import { IoText } from 'react-icons/io5'
import { BsTypeBold } from 'react-icons/bs'
import { BiItalic } from 'react-icons/bi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { AiOutlineLink } from 'react-icons/ai'
import { BiImageAlt } from 'react-icons/bi'
export function DescEdit() {
     return (
          <section className='section-edit-desc'>
               <div className='div-desc-edit'>
                    <div className='div-desc-edit-icons'>
                         <IoText className='desc-edit-icon' />
                         <BsTypeBold className='desc-edit-icon' />
                         <BiItalic className='desc-edit-icon' />
                         <AiOutlineUnorderedList className='desc-edit-icon' />
                         <AiOutlineLink className='desc-edit-icon' />
                         <BiImageAlt className='desc-edit-icon' />
                    </div>
               </div>
               <textarea className='desc-textarea' placeholder='Enter new description...'></textarea>
               <button className='desc-btn-save'>Save</button>
               <button className='desc-btn-cancel'>Cancel</button>
          </section>
     )
}
