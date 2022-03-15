export const sortContacts = (contacts, page, navPanelIsVisible) => {
    let sortedContacts = [];
    if (page == 'messages/' && navPanelIsVisible) {
        contacts.map(contact => {
            if (contact.contact_group) {
                if (sortedContacts.some(sortedContact => sortedContact[contact.contact_group])) {
                    sortedContacts.map(sortedContact => {
                        if (typeof sortedContact == 'object')
                            if (sortedContact.hasOwnProperty(contact.contact_group)) {
                                sortedContact[contact.contact_group] = [...sortedContact[contact.contact_group], contact]
                            }
                    })
                } else {
                    let obj = {}
                    obj[contact.contact_group] = [contact]
                    sortedContacts.push(obj)
                }
            } else {
                sortedContacts.push(contact)
            }
        })
        return sortedContacts
    }
    return contacts
}