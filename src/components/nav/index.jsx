import { Bell, User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom'


export default function NavHeader({ handleLogout }) {
  return (
    <header className="bg-primary text-primary-foreground border-b border-primary/10">
      <div className="container mx-auto px-4 py-2 flex justify-end items-center">
        <div className="flex items-center justify-end space-x-4">
          <NotificationButton />
          <ProfileMenu handleLogout={handleLogout} />
        </div>
      </div>
    </header>
  )
}

function NotificationButton() {
  return (
    <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/10">
      <Bell className="h-5 w-5" />
      <Badge className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full p-0 flex items-center justify-center" variant="destructive">
        3
      </Badge>
      <span className="sr-only">Notificaciones</span>
    </Button>
  )
}

function ProfileMenu({ handleLogout }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-primary-foreground/10">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@usuario" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}