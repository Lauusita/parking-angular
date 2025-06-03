import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faUser, faEdit, faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Propietario, tipoDocumento } from '@/app/interfaces/propietario.interface';
import { PropietarioService } from '@/app/services/propietario.service';
import { ToastService } from '@/app/services';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-perfil-propietario',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, FormsModule, MatDialogModule ],
  
  templateUrl: './perfil-propietario.component.html'
})
export class PerfilPropietarioComponent implements OnInit{

  prop: Propietario = {
    nombre : "",
    apellido : "",
    correo : "",
    contrasena : "",
    telefono : "",
    tipoDocumento : "CC",
    numeroDocumento : ""
  };

  id = "";

    
  userIcon = faUser;
  editIcon = faEdit;
  deleteIcon = faTrash;
  saveIcon = faCheck;
  cancelIcon = faTimes;

  isEditing = false;

  constructor(
      private readonly propietarioService: PropietarioService,
      private readonly toastService: ToastService,
      private readonly router: Router,
      public dialog: MatDialog,

    ) {
  }

  ngOnInit(): void {
    this.id = localStorage.getItem("userId")?.toString()!
    this.propietarioService.getPropietarioDetails(this.id).subscribe({
      next: ({nombre, apellido, contrasena, correo, numeroDocumento, telefono, tipoDocumento}: Propietario) => {
        
        this.prop = {
          nombre, apellido, contrasena, correo, numeroDocumento, telefono, tipoDocumento
        }
      }
    });
  }

  handleErrors( message: string, title: string ) {
    this.toastService.showToast({
      type: 'error',
      title,
      message
    })
  }

  editedUser: Propietario = { ...this.prop };

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editedUser = { ...this.prop };
    }
  }

  edit() {
    this.propietarioService.updatePropietario(this.id, this.editedUser).subscribe({
      next: () => {
        new ToastService().showToast({
          message: "Actualizado",
          title: "yupi",
          type: "success",
          duration: 2
        })
      },
      error: (error) => {
        this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
      }
    })
  }

  delete() {
    this.propietarioService.deletePropietario(this.id).subscribe({
      next: () => {
        new ToastService().showToast({
          message: "Actualizado",
          title: "yupi",
          type: "success",
          duration: 2
        })
        
        localStorage.clear()
        this.router.navigateByUrl("/create-account/propietario")
      },
      error: (error) => {
        this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
      }
    })
  }

  openDeleteModal() {
      const dialog = this.dialog.open(ModalComponent, {
        width: "300px",
        data: {
          title: `You are about to delete your account!`,
          message: "This action will delete your awesome account! Are you sure?",
          type: "delete"
        }
      })
  
      dialog.afterClosed().subscribe((deleted: boolean) => {
        if (!deleted) return
          this.delete()
      })
    }
}
