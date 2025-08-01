type ChatUIContextType = {
    isChatBox: boolean;
    setIsChatBox: (chat: boolean) => void,
    selectedUser: User | undefined,
    setSelectedUser: (user: User) => void
};