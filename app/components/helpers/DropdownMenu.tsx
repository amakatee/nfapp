'useclient'
import React from 'react'
import Link from 'next/link'
// import MenuItemsLink from '@/components/helper/MenuItemsLink'

type menuItem = {
    label: string;
    url: string;
    children?: menuItem[];
    isExternal?: boolean;
}
interface DropdownMenuProps {
    items: menuItem[],
    isOpen: boolean;

}

const DropdownMenu = ({items, isOpen}: DropdownMenuProps) => {
    if (!isOpen) return null
    console.log(items)
    
  return (
    <div
    className='absolute  left-0  mt-1 w-48 bg-white rounded-md shadow-lg py-1  border-gray-200'
    > 
 
  
        {
            items.map((item, i) => {
                if(item.children && item.children.length > 0) {
                    return (
                        <div
                        key={i}
                        className="relative group"
                        >
                            <button
                            className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors'
                            >
                                {item.label}
                            </button>
                            <div className='left-full top-0 z-3000 ml-1 w-48'>
                                { item.children.map((subItem, subIndex) => (
                                    <div>{subItem.label}</div>
                                ))}

                            </div>
                        </div>
                    )
                }
                <div>element</div>
                //return <MenuItemLink key={i} item={item} />
            })
        }

    </div>
  )
}

function MenuItemLink({ item }: { item: menuItem }) {
    // Для mailto и tel ссылок используем обычный тег <a>
    if (item.url?.startsWith('mailto:') || item.url?.startsWith('tel:')) {
      return (
        <a
          href={item.url}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          {item.label}
        </a>
      );
    }
  
    // Для внешних ссылок
    if (item.isExternal || item.url?.startsWith('http')) {
      return (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          {item.label}
        </a>
      );
    }
  
    // Для внутренних ссылок Next.js
    return (
      <Link
        href={item.url || '#'}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
      >
        {item.label}
      </Link>
    );
  }

export default DropdownMenu