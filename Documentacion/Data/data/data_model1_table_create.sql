CREATE TABLE public.hoteles (
    id_hotel numeric(5) NOT NULL,
    nombre_hotel varchar NOT NULL,
    correo_hotel varchar,
    telefono1 varchar NOT NULL,
    telefono2 varchar,
    ciudad_hotel varchar NOT NULL,
    PRIMARY KEY (id_hotel)
);


CREATE TABLE public.habitaciones (
    id_habitacion numeric(3) NOT NULL,
    tipo_habitacion char NOT NULL,
    costo_habitacion numeric NOT NULL,
    estado_habitacion char NOT NULL,
    id_hotel numeric(5) NOT NULL,
    PRIMARY KEY (id_habitacion, id_hotel)
);


CREATE TABLE public.trabajadores (
    id_trabajador numeric(10) NOT NULL,
    nombre_trabajador varchar NOT NULL,
    telefono_trabajador varchar,
    cargo_trabajador varchar NOT NULL,
    contrasenia_trabajador varchar NOT NULL,
    id_hotel numeric(5) NOT NULL,
    PRIMARY KEY (id_trabajador)
);

CREATE INDEX ON public.trabajadores
    (id_hotel);


CREATE TABLE public.clientes (
    id_cliente numeric(10) NOT NULL,
    nombre_cliente varchar NOT NULL,
    telefono_cliente varchar,
    correo_cliente varchar,
    porcentaje_descuento double precision,
    PRIMARY KEY (id_cliente)
);


CREATE TABLE public.facturas (
    id_factura numeric(10) NOT NULL,
    fecha_factura date NOT NULL,
    estado_factura char NOT NULL,
    abono numeric,
    id_reserva numeric(15) NOT NULL,
    total_factura numeric,
    PRIMARY KEY (id_factura)
);

CREATE INDEX ON public.facturas
    (id_reserva);


CREATE TABLE public.servicios (
    id_servicio numeric(2) NOT NULL,
    nombre_servicio varchar NOT NULL,
    detalle_servicio varchar,
    costo_servicio numeric NOT NULL,
    id_hotel numeric(5) NOT NULL,
    PRIMARY KEY (id_servicio)
);

ALTER TABLE public.servicios
    ADD UNIQUE (id_hotel);


CREATE TABLE public.reservas (
    id_reserva numeric(15) NOT NULL,
    fecha_reservacion_inicio date NOT NULL,
    fecha_reservacion_fin date NOT NULL,
    estado_reserva char NOT NULL,
    id_cliente numeric(10) NOT NULL,
    id_trabajador numeric(10) NOT NULL,
    id_hotel numeric(5) NOT NULL,
    PRIMARY KEY (id_reserva)
);

CREATE INDEX ON public.reservas
    (id_cliente);
CREATE INDEX ON public.reservas
    (id_trabajador);
CREATE INDEX ON public.reservas
    (id_hotel);


CREATE TABLE public.consumo_habitaciones (
    id_habitacion numeric(3) NOT NULL,
    id_hotel numeric(5) NOT NULL,
    id_factura numeric(10) NOT NULL,
    PRIMARY KEY (id_habitacion, id_hotel, id_factura)
);


CREATE TABLE public.consumo_servicios (
    id_servicio numeric(2) NOT NULL,
    id_factura numeric(10) NOT NULL,
    PRIMARY KEY (id_servicio, id_factura)
);


ALTER TABLE public.habitaciones ADD CONSTRAINT FK_habitaciones__id_hotel FOREIGN KEY (id_hotel) REFERENCES public.hoteles(id_hotel);
ALTER TABLE public.trabajadores ADD CONSTRAINT FK_trabajadores__id_hotel FOREIGN KEY (id_hotel) REFERENCES public.hoteles(id_hotel);
ALTER TABLE public.facturas ADD CONSTRAINT FK_facturas__id_reserva FOREIGN KEY (id_reserva) REFERENCES public.reservas(id_reserva);
ALTER TABLE public.servicios ADD CONSTRAINT FK_servicios__id_hotel FOREIGN KEY (id_hotel) REFERENCES public.hoteles(id_hotel);
ALTER TABLE public.reservas ADD CONSTRAINT FK_reservas__id_cliente FOREIGN KEY (id_cliente) REFERENCES public.clientes(id_cliente);
ALTER TABLE public.reservas ADD CONSTRAINT FK_reservas__id_trabajador FOREIGN KEY (id_trabajador) REFERENCES public.trabajadores(id_trabajador);
ALTER TABLE public.reservas ADD CONSTRAINT FK_reservas__id_hotel FOREIGN KEY (id_hotel) REFERENCES public.hoteles(id_hotel);
ALTER TABLE public.consumo_habitaciones ADD CONSTRAINT FK_consumo_habitaciones__id_habitacion FOREIGN KEY (id_habitacion) REFERENCES public.habitaciones(id_habitacion);
ALTER TABLE public.consumo_habitaciones ADD CONSTRAINT FK_consumo_habitaciones__id_hotel FOREIGN KEY (id_hotel) REFERENCES public.habitaciones(id_hotel);
ALTER TABLE public.consumo_habitaciones ADD CONSTRAINT FK_consumo_habitaciones__id_factura FOREIGN KEY (id_factura) REFERENCES public.facturas(id_factura);
ALTER TABLE public.consumo_servicios ADD CONSTRAINT FK_consumo_servicios__id_servicio FOREIGN KEY (id_servicio) REFERENCES public.servicios(id_servicio);
ALTER TABLE public.consumo_servicios ADD CONSTRAINT FK_consumo_servicios__id_factura FOREIGN KEY (id_factura) REFERENCES public.facturas(id_factura);