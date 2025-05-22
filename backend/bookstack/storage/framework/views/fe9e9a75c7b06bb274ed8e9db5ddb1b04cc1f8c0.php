<?php $__env->startComponent('entities.list-item-basic', ['entity' => $entity]); ?>

<div class="entity-item-snippet">

    <?php if($showPath ?? false): ?>
        <?php if($entity->relationLoaded('book') && $entity->book): ?>
            <span class="text-book"><?php echo e($entity->book->getShortName(42)); ?></span>
            <?php if($entity->relationLoaded('chapter') && $entity->chapter): ?>
                <span class="text-muted entity-list-item-path-sep"><?php echo icon('chevron-right'); ?></span> <span class="text-chapter"><?php echo e($entity->chapter->getShortName(42)); ?></span>
            <?php endif; ?>
        <?php endif; ?>
    <?php endif; ?>

    <p class="text-muted break-text"><?php echo e($entity->preview_content ?? $entity->getExcerpt()); ?></p>
</div>

<?php if(($showTags ?? false) && $entity->tags->count() > 0): ?>
    <div class="entity-item-tags mt-xs">
        <?php echo $__env->make('entities.tag-list', ['entity' => $entity, 'linked' => false ], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </div>
<?php endif; ?>

<?php if(($showUpdatedBy ?? false) && $entity->relationLoaded('updatedBy') && $entity->updatedBy): ?>
    <small title="<?php echo e($entity->updated_at->toDayDateTimeString()); ?>">
        <?php echo trans('entities.meta_updated_name', [
            'timeLength' => $entity->updated_at->diffForHumans(),
            'user' => e($entity->updatedBy->name)
        ]); ?>

    </small>
<?php endif; ?>

<?php echo $__env->renderComponent(); ?><?php /**PATH /var/www/bookstack/resources/views/entities/list-item.blade.php ENDPATH**/ ?>