import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SearchService{
    private ciudades: string[] = [
        'AYACUCHO', 'BAGUA', 'BAGUA GRANDE', 'BARRANCA', 'BELLAVISTA', 
        'CARAZ', 'CARHUAZ', 'CASMA', 'CHACHAPOYAS', 'CHAVIN', 
        'CHEPEN', 'CHICLAYO', 'CHIMBOTE', 'HUACHO', 'HUANCAYO', 
        'HUANUCO', 'HUARAZ', 'HUARI', 'HUARMEY', 'JAEN', 
        'JAUJA', 'JUANJUI', 'LA MERCED', 'LIMA', 'MANCOS', 
        'MOYOBAMBA', 'NUEVA CAJAMARCA', 'OXAPAMPA', 'PACASMAYO', 
        'PARAMONGA', 'PEDRO RUIZ', 'PICHANAQUI', 'PICOTA', 'PIURA', 
        'PUCALLPA', 'PUCARA', 'RECUAY', 'RIOJA', 'SAN MARCOS', 
        'SAN RAMON', 'SATIPO', 'SULLANA', 'TARAPOTO', 'TARMA', 
        'TINGO MARIA', 'TOCACHE', 'TRUJILLO', 'VILLA RICA', 'YUNGAY'
    ];
    get Ciudades():string[] {
        return this.ciudades
    }
}