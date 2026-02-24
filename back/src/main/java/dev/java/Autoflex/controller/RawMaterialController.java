package dev.java.Autoflex.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.java.Autoflex.dto.CreateUpdateRawMaterialRequest;
import dev.java.Autoflex.dto.RawMaterialResponse;
import dev.java.Autoflex.model.RawMaterial;
import dev.java.Autoflex.service.RawMaterialService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;




@Tag(name = "RawMaterialController")
@RestController
@RequestMapping("/api/v1/raw_material")
public class RawMaterialController {
    private final RawMaterialService rawMaterialService;
    private final ModelMapper modelMapper;
    
    public RawMaterialController(RawMaterialService rawMaterialService, ModelMapper modelMapper) {
        this.rawMaterialService = rawMaterialService;
        this.modelMapper = modelMapper;
    }

    @PostMapping("create")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Matéria-prima criada com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    public ResponseEntity<RawMaterialResponse> create(@RequestBody CreateUpdateRawMaterialRequest request) {
        RawMaterial rawMaterial = modelMapper.map(request, RawMaterial.class);

        RawMaterial saved = rawMaterialService.save(rawMaterial);

        RawMaterialResponse response =
                modelMapper.map(saved, RawMaterialResponse.class);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("update/{id}")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Matéria-prima atualizada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Matéria-prima não encontrada"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos fornecidos")
    })
    public ResponseEntity<RawMaterialResponse> update(
            @PathVariable Long id,
            @RequestBody CreateUpdateRawMaterialRequest request) {

        RawMaterial rawMaterial = modelMapper.map(request, RawMaterial.class);
        rawMaterial.setId(id);

        rawMaterialService.update(rawMaterial);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("get/all")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista de matérias-primas retornada com sucesso")
    })
    public ResponseEntity<List<RawMaterialResponse>> getAll(){
        List<RawMaterialResponse> response =
                rawMaterialService.findAll()
                        .stream()
                        .map(rawMaterial -> modelMapper.map(rawMaterial, RawMaterialResponse.class))
                        .toList();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("get/all/paginated")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Lista paginada de matérias-primas retornada com sucesso")
    })
    public ResponseEntity<Page<RawMaterialResponse>> getAllPaginated(Pageable pageable) {
        Page<RawMaterialResponse> response = rawMaterialService.findAll(pageable)
                .map(rawMaterial -> modelMapper.map(rawMaterial, RawMaterialResponse.class));

        return ResponseEntity.ok(response);
    }

    @GetMapping("get/by/{id}")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Matéria-prima encontrada com sucesso"),
        @ApiResponse(responseCode = "404", description = "Matéria-prima não encontrada")
    })
    public ResponseEntity<RawMaterialResponse> findById(@PathVariable Long id){
        RawMaterial rawMaterial = rawMaterialService.findById(id);
        RawMaterialResponse response = modelMapper.map(rawMaterial, RawMaterialResponse.class);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    @DeleteMapping("delete")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Matéria-prima excluída com sucesso"),
        @ApiResponse(responseCode = "404", description = "Matéria-prima não encontrada")
    })
    public ResponseEntity<Void> deleteById(@RequestParam Long id){
        rawMaterialService.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    
}