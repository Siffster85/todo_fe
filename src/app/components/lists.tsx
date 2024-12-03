"use client"
import { useEffect, useState } from "react";
import { createList, createListItem, deleteList, deleteListItem, getLists, getListsById, patchListItem } from "@/api";
import Items from "./items";
import ConfirmationModal from "./confirmationModal";

export default function Lists() {
    const [lists, setLists] = useState<ListsArray[]>([])
    const [newList, addNewList] = useState({ title: ""})
    const [items, setItems] = useState<ItemsArray[]>([]) 
    const [list, setList] = useState<ListsArray>({id: 0, title: ""})    
    const [item, setItem] = useState<string>("")
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

    const handleAddItem = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItem(event.target.value)
    }
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (item) {
            createListItem({
                task: item,
                completed: false,
                listId: list.id
            }).then(() => handleSelect(list.id)
            ).then(() => setItem("")
            ).catch((error) => {
            console.log(error);
            })
        }
    }
    //The above 2 functions save a new task as an item variable and then creates the task within the database.
    const refreshData = () => {
        const fetchLists = async () => {
            const result = await getLists()
            setLists(result.data.data)
        }
        fetchLists()
        handleSelect(list.id)
    }
    // This is the refresh data function and loads the selected list into the page.
    const handleSelect = async (listId:number) => { 
    if(listId !== 0){
        const result = await getListsById(listId)
        setList(result.data);
        setItems(result.data.items);
    }}
    // This function takes the selected listId and then makes the api call for the list from the DB
    const makeList = async () => {
        if(newList.title){
            await createList(newList)
            refreshData()
        }
    }
    // Takes the object in newList and makes the POST api call then refreshes the lists
    const removeList = (id: number) => {
        const remove = async () => {
            await deleteList(id)
            setList({id: 0, title: ""})
            setLists(lists.filter((list) => list.id !== id))
        }
        remove()
        refreshData()
    }
    // Takes the id of the list and makes the DELETE api call with a cascade
    const deleteItem = (id: number) => {
        const remove = async () => {
            await deleteListItem(id)
            setItems(items.filter((item) => item.id !== id))
        }
        remove()
        refreshData()
    }
    // Takes the list item id and makes the DELETE request
    const updateStatus = (id: number, isChecked: boolean) => {
        const completedCheck = async () => {
            await patchListItem(id, {completed: isChecked})
            setItems(items.map((items) => items.id === id ? {...items, completed: !items.completed} 
            : items));
        }
        completedCheck()
        refreshData()
    }
    // This updates the database with the new status of completed or not, it also refreshes the frontend to ensure using the correct status that is in the db
    const handleDeleteClick = () => {
        setIsConfirmationOpen(true);
    }
    const handleConfirmationClose = () => {
        setIsConfirmationOpen(false);
    }
    const handleConfirmDelete = () => {
        removeList(list.id);
        setIsConfirmationOpen(false);
    }
    //The above 3 functions are state handlers from the visability of the modal and for actioning the delete function.
    useEffect(() => {  
        refreshData()        
    }, [])
    // The useEffect is used here just to ensure that the data of the 1st load is correct

    return (
        <div className="flex flex-col w-3/4 items-center text-center py-1 px-1">
            <div id="new-list">
            <form onSubmit={event => {
                event.preventDefault()
                makeList()
                addNewList({ title: ""})
            }} className="w-auto py-2 align-middle items-stretch m-1 mb-4">
                <input type="text"
                    placeholder=" New List Title" 
                    value={newList.title}
                    onChange={event => addNewList({title: event.target.value})}
                    className="border-2 mx-1 rounded-lg border-teal-400"/>
                <button type="submit" className="bg-blue-300 px-4 m-1 rounded-lg border-2 border-teal-400 hover:bg-green-200">
                Add
                </button>
            </form>
            </div>
            <div>
            <div id="lists" className="flex flex-row flex-wrap mb-4">
            
                {lists.map((list) => {
                    return(
                        <div key={list.id} onClick={() => handleSelect(list.id)}  className="flex justify-center basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 flex-1 border-2 rounded-lg border-teal-400 m-2 cursor-pointer bg-blue-200 hover:bg-green-200">
                        <div className="self-center text-2xl p-1.5">{list.title}</div>
                        </div>
                    )
                    }
                    )}
            </div>
            <div id="items" className="">
                {list.id === 0 ? <></> : <h2 className="font-bold text-2xl underline decoration-2 ">{list.title}</h2>}
                {list.id === 0 ? <></> : <div className="p-1">
                {items.length === 0 ? <p>Please Add Items to your To-Do List</p> : <div>
                {items.map((item) => {        
                    return (
                        <Items key={item.id} item={item} deleteItem={deleteItem} updateStatus={updateStatus}/> 
                    )}
                )}
                </div>}
                </div>}
                {list.id === 0 ? <></> : <div>
                <div id="add-item">
                <form action="">
                    <label htmlFor="add_item">
                        Add Item:
                    </label>
                    <input type="text" value={item} id="add_item" onChange={handleAddItem} className="w-1/2 border-2 border-teal-400 m-2 rounded-md" />
                    <button onClick={handleSubmit} id="add_item" className="bg-green-500 px-4 rounded-lg border-2 border-teal-400  hover:bg-green-300">Submit</button>
                </form>
                </div>
                <button
                onClick={handleDeleteClick}
                className="bg-red-500 py-1 px-2 rounded-lg border-2 mt-5 border-teal-400 hover:bg-red-300"
                >Delete List</button>
                <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={handleConfirmationClose}
                onConfirm={handleConfirmDelete}
                message={`Are you sure you want to delete the list titled '${list.title}'?`}/>
                </div>}
            </div>
            </div>
        </div>
    );
}


