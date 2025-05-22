<div class="entity-meta">
    <?php if($entity->isA('revision')): ?>
        <div>
            <?php echo icon('history'); ?><?php echo e(trans('entities.pages_revision')); ?>

            <?php echo e(trans('entities.pages_revisions_number')); ?><?php echo e($entity->revision_number == 0 ? '' : $entity->revision_number); ?>

        </div>
    <?php endif; ?>

    <?php if($entity->isA('page')): ?>
        <div>
            <?php if(userCan('page-update', $entity)): ?> <a href="<?php echo e($entity->getUrl('/revisions')); ?>"> <?php endif; ?>
            <?php echo icon('history'); ?><?php echo e(trans('entities.meta_revision', ['revisionCount' => $entity->revision_count])); ?>

            <?php if(userCan('page-update', $entity)): ?></a><?php endif; ?>
        </div>
    <?php endif; ?>

    <?php if($entity->ownedBy && $entity->owned_by !== $entity->created_by): ?>
        <div>
            <?php echo icon('user'); ?><?php echo trans('entities.meta_owned_name', [
            'user' => "<a href='{$entity->ownedBy->getProfileUrl()}'>".e($entity->ownedBy->name). "</a>"
        ]); ?>

        </div>
    <?php endif; ?>

    <?php if($entity->createdBy): ?>
        <div>
            <?php echo icon('star'); ?><?php echo trans('entities.meta_created_name', [
            'timeLength' => '<span title="'.$entity->created_at->toDayDateTimeString().'">'.$entity->created_at->diffForHumans() . '</span>',
            'user' => "<a href='{$entity->createdBy->getProfileUrl()}'>".e($entity->createdBy->name). "</a>"
            ]); ?>

        </div>
    <?php else: ?>
        <div>
            <?php echo icon('star'); ?><span title="<?php echo e($entity->created_at->toDayDateTimeString()); ?>"><?php echo e(trans('entities.meta_created', ['timeLength' => $entity->created_at->diffForHumans()])); ?></span>
        </div>
    <?php endif; ?>

    <?php if($entity->updatedBy): ?>
        <div>
            <?php echo icon('edit'); ?><?php echo trans('entities.meta_updated_name', [
                'timeLength' => '<span title="' . $entity->updated_at->toDayDateTimeString() .'">' . $entity->updated_at->diffForHumans() .'</span>',
                'user' => "<a href='{$entity->updatedBy->getProfileUrl()}'>".e($entity->updatedBy->name). "</a>"
            ]); ?>

        </div>
    <?php elseif(!$entity->isA('revision')): ?>
        <div>
            <?php echo icon('edit'); ?><span title="<?php echo e($entity->updated_at->toDayDateTimeString()); ?>"><?php echo e(trans('entities.meta_updated', ['timeLength' => $entity->updated_at->diffForHumans()])); ?></span>
        </div>
    <?php endif; ?>
</div><?php /**PATH /var/www/bookstack/resources/views/entities/meta.blade.php ENDPATH**/ ?>