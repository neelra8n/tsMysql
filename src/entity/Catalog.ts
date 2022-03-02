import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { CatalogTimeStamp } from './CatalogTimeStamp';

@Entity()
export class Catalog {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    journal: string;

    @Column()
    publisher: string;

    @Column({
        length: 25
    })
    edition: string;

    @Column("text")
    title: string

    @Column()
    author: string

    @Column()
    isPublished: boolean

    @OneToOne(type => CatalogTimeStamp, timestamp => timestamp.catalog, {
        cascade: true
    })
    timestamp = CatalogTimeStamp ;
}